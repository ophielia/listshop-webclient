import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {UserDeviceInfo} from "../../model/user-device-info";
import {AuthorizePost} from "../../model/authorize-post";
import {from, Observable, of, Subscription, throwError} from "rxjs";
import {catchError, finalize, map, switchMap} from "rxjs/operators";
import MappingUtils from "../../model/mapping-utils";
import {User} from "../../model/user";
import {CreateUserPost} from "../../model/create-user-post";
import CreateUserStatus from "../../model/create-user-status";
import {ListService} from "./list.service";
import {TokenRequest, TokenType} from "../../model/token-request";
import {TokenProcessPost} from "../../model/token-process-post";
import {ChangePasswordPost} from "../../model/change-password-post";
import {ListShopPayload} from "../../model/list-shop-payload";
import {EnvironmentLoaderService} from "./environment-loader.service";
import {NGXLogger} from "ngx-logger";
import {Router} from "@angular/router";


@Injectable()
export class AuthenticationService implements OnDestroy {
    static instance: AuthenticationService;

    private authUrl;
    private userUrl;
    private userIsAuthenticated = false;

    private refreshPeriod = 4 * 60 * 60  * 1000; // refresh period in milliseconds.
    private lastTokenCheck: number = 0;

    unsubscribe: Subscription[] = [];

    constructor(
        private httpClient: HttpClient,
        private envLoader: EnvironmentLoaderService,
        public router: Router,
        private logger: NGXLogger
    ) {
        logger.debug(envLoader.getEnvConfig());

        if (!AuthenticationService.instance) {
            this.loadConfig();

        }

        // Return the static instance of the class
        // Which will only ever be the first instance
        // Due to the if statement above
        return AuthenticationService.instance;

    }

    loadConfig() {
        let sub$ = this.envLoader
            .getEnvConfigWhenReady()
            .subscribe(config => {
                if (config) {
                    this.authUrl = config.apiUrl + "auth";
                    this.userUrl = config.apiUrl + "user";
                this.logger.info("auth - api is " + config.apiUrl);
                this.logger.info("auth - user is " + this.userUrl);
                }
                let promise = this.checkAuthenticationOnInitialize().toPromise();
                promise.then(data => {
                    this.userIsAuthenticated = data;
                })
                AuthenticationService.instance = this;
            });
        this.unsubscribe.push(sub$);
    }
    ngOnDestroy() {
        this.unsubscribe.forEach(s => s.unsubscribe());
    }

    checkAuthenticationOnInitialize(): Observable<boolean> {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var token = currentUser && currentUser.token;
        if (!token) {
            this.userIsAuthenticated = false;
            return of(false);
        }
        // prepare device info
        this.lastTokenCheck = new Date().getTime();
        var deviceInfo = this.createDeviceInfo();
        var url = this.authUrl + "/authenticate";
        return this.httpClient.post(url, JSON.stringify(deviceInfo), {observe: 'response'})
            .pipe(map((response: HttpResponse<any>) => {
                var status = response.status;
                console.log("status is: " + status);
                if (status >= 200 && status < 300) {
                    this.userIsAuthenticated = true;
                    return true;
                }
                    this.userIsAuthenticated = false;
                    localStorage.removeItem('currentUser');
                                    return false;

            }),
                catchError(this.handleAuthenticationError));
    }
    checkAuthentication(): Promise<boolean>  {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var token = currentUser && currentUser.token;
        if (!token) {
            this.userIsAuthenticated = false;
            return of(false).toPromise();
        }
        // prepare device info
        this.lastTokenCheck = new Date().getTime();
        var deviceInfo = this.createDeviceInfo();
        var url = this.authUrl + "/authenticate";
        return this.httpClient.post(url, JSON.stringify(deviceInfo), {observe: 'response'})
            .pipe(map((response: HttpResponse<any>) => {
                    var status = response.status;
                    console.log("status is: " + status);
                    if (status >= 200 && status < 300) {
                        this.userIsAuthenticated = true;
                        return true;
                    }
                    this.userIsAuthenticated = false;
                    localStorage.removeItem('currentUser');
                    return false;

                }),
                catchError(this.handleAuthenticationError)).toPromise();

    }
    checkAuthenticationAndKickout(): Promise<boolean>  {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var token = currentUser && currentUser.token;
        if (!token) {
            this.userIsAuthenticated = false;
            return of(false).toPromise();
        }
        // prepare device info
        this.lastTokenCheck = new Date().getTime();
        var deviceInfo = this.createDeviceInfo();
        var url = this.authUrl + "/authenticate";
        return this.httpClient.post(url, JSON.stringify(deviceInfo), {observe: 'response'})
            .pipe(map((response: HttpResponse<any>) => {
                    var status = response.status;
                    this.logger.debug("authentication status is: " + status);
                    if (status >= 200 && status < 300) {
                        this.userIsAuthenticated = true;
                        return true;
                    }
                    this.userIsAuthenticated = false;
                    localStorage.removeItem('currentUser');

                    this.router.navigate(['/user/login']);

                }),
                catchError(this.handleAuthenticationError)).toPromise();

    }




    login(username: string, password: string): Observable<boolean> {
        AuthenticationService.clearToken();
        // prepare device info
        var deviceInfo = this.createDeviceInfo();
        var authorizePost = new AuthorizePost();
        authorizePost.password = password;
        authorizePost.username = username;
        authorizePost.device_info = deviceInfo
        return this.httpClient.post(this.authUrl, JSON.stringify(authorizePost))
            .pipe(map((response: HttpResponse<any>) => {

                // login successful if there's a jwt token in the response
                    let user = MappingUtils.toUser(response);

                    if (user) {
                        this.userIsAuthenticated = true;
                        // store username and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        this.lastTokenCheck = new Date().getTime();
                        // return true to indicate successful login
                        return true;
                    } else {
                        this.userIsAuthenticated = false;
                        return false;
                    }
                }),
                catchError(this.handleError));
    }

    private createDeviceInfo(): UserDeviceInfo {
        var deviceInfo = new UserDeviceInfo();
        deviceInfo.client_type = "Web";
        deviceInfo.model = this.getBrowserName();
        deviceInfo.os_version = this.getBrowserVersion();
        return deviceInfo;
    }

    createUser(username: string, password: string): Observable<CreateUserStatus> {
        // clear any existing token
        AuthenticationService.clearToken();
        // prepare device info
        let deviceInfo = new UserDeviceInfo();
        deviceInfo.client_type = "Web";
        deviceInfo.model = this.getBrowserName();
        deviceInfo.os_version = this.getBrowserVersion();
        // prepare user info
        let encodedUsername = btoa(username);
        let encodedPassword = btoa(password);
        let user = new User();
        user.email = encodedUsername;
        user.user_name = encodedUsername;
        user.password = encodedPassword;

        var createUserPost = new CreateUserPost();
        createUserPost.user = user;
        createUserPost.device_info = deviceInfo;

        return this.httpClient.post(this.userUrl, JSON.stringify(createUserPost))
            .pipe(map((response: HttpResponse<any>) => {

                    // login successful if there's a jwt token in the response
                    let user = MappingUtils.toUser(response);

                    if (user) {
                        this.userIsAuthenticated = true;
                        // store username and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(user));

                        // create list, and return true

                        return CreateUserStatus.Success;
                    } else {
                        return CreateUserStatus.UnknownError;
                    }
                }),
                catchError(this.handleError));
    }

    nameIsTaken(userName: string): Observable<boolean> {
        var requestUrl = this.userUrl + '/name'

        var listShopPayload = new ListShopPayload();
        listShopPayload.parameters[0] = userName;

        return this.httpClient.post(requestUrl, JSON.stringify(listShopPayload))
            .pipe(map((response: HttpResponse<any>) => {
                if (!response) {
                    return false;
                }
                return true;
            }));
    }

    logout(): Observable<any> {
        var requestUrl = this.authUrl + '/logout'
        var returnValue: boolean = true;
        return this.httpClient.get(requestUrl)
            .pipe(
                finalize(() => {
                        this.userIsAuthenticated = false;
                        localStorage.removeItem('currentUser');
                        return of(true);
                    }
                ));
    }

    logoutAndGoToLoginPage()  {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/user/login']);
    }

    deleteUser(): Observable<any> {
        var requestUrl = this.userUrl

        return this.httpClient.delete(requestUrl)
            .pipe(
                finalize(() => {
                        localStorage.removeItem('currentUser');
                        return of(true);
                    }
                ));
    }

    isAuthenticated() {
        // isAuthenticated's responsibility is only to check that a token is there,
        // then to remind the authentication service to check that the token is valid.
        // If the service finds an invalid token, it deletes it.
        this.logger.debug("checking for token isAuthenticated");

        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var token = currentUser && currentUser.token;
        this.checkAuthentication();
        return token != null;
    }

    getBrowserName() {
        const agent = window.navigator.userAgent.toLowerCase()
        switch (true) {
            case agent.indexOf('edge') > -1:
                return 'edge';
            case agent.indexOf('opr') > -1 && !!(<any>window).opr:
                return 'opera';
            case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
                return 'chrome';
            case agent.indexOf('trident') > -1:
                return 'ie';
            case agent.indexOf('firefox') > -1:
                return 'firefox';
            case agent.indexOf('safari') > -1:
                return 'safari';
            default:
                return 'other';
        }
    }

    getBrowserVersion() {
        var userAgent = navigator.userAgent, tem,
            matchTest = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

        if (/trident/i.test(matchTest[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(userAgent) || [];
            return 'IE ' + (tem[1] || '');
        }

        if (matchTest[1] === 'Chrome') {
            tem = userAgent.match(/\b(OPR|Edge)\/(\d+)/);
            if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }

        matchTest = matchTest[2] ? [matchTest[1], matchTest[2]] : [navigator.appName, navigator.appVersion, '-?'];

        if ((tem = userAgent.match(/version\/(\d+)/i)) != null) matchTest.splice(1, 1, tem[1]);
        return matchTest.join(' ');
    }

    requestPasswordReset(email: string): Observable<any> {
        var passwordResetRequest = new TokenRequest();
        passwordResetRequest.token_parameter = email;
        passwordResetRequest.token_type = TokenType.PasswordReset;

        let url = this.userUrl + "/token/tokenrequest";
        return this.httpClient.post(url, JSON.stringify(passwordResetRequest))
            .pipe(map((response: HttpResponse<any>) => {
                    // login successful if there's a jwt token in the response
                    let userTest = "userTest";
                    return userTest;
                }),
                catchError(this.handleError));
    }

    resetPasswordWithToken(token: string, newPassword: string): Observable<any> {
        localStorage.removeItem('currentUser');

        var passwordResetRequest = new TokenProcessPost();
        passwordResetRequest.token_parameter = newPassword;
        passwordResetRequest.token = token;
        passwordResetRequest.token_type = TokenType.PasswordReset;

        let url = this.userUrl + "/token";
        return this.httpClient.post(url, JSON.stringify(passwordResetRequest))
            .pipe(map((response: HttpResponse<any>) => {
                return "done";
            }));
    }

    static clearToken() {
        localStorage.removeItem('currentUser');
    }

    changePassword(originalPassword: string, newPassword: string): Observable<any> {
        let encodedNewPassword = btoa(newPassword);
        let encodedOrigPassword = btoa(originalPassword);
        let postObject = new ChangePasswordPost();
        postObject.new_password = encodedNewPassword;
        postObject.original_password = encodedOrigPassword;

        let url = this.userUrl + "/password";

        return this.httpClient.post(url, JSON.stringify(postObject))
            .pipe(map((response: HttpResponse<any>) => {
                    // login successful if there's a jwt token in the response
                    return "ok";
                }),
                catchError(this.handleError));
    }

    handleError(error: any) {
        // log error
        // could be something more sophisticated
        let errorMsg = error.message || `Yikes! There was a problem with our hyperdrive device and we couldn't retrieve your data!`
        console.error(errorMsg);

        // throw an application level error
        return throwError(error);
    }

    handleAuthenticationError(error: any) : Observable<boolean> {
        // log error
        // could be something more sophisticated
        let errorMsg = error.message || `User could not be authenticated`;
        console.log(errorMsg);
        this.userIsAuthenticated = false;
        localStorage.removeItem('currentUser');
        return of(false);
    }

}
