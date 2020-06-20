import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {UserDeviceInfo} from "../../model/user-device-info";
import {AuthorizePost} from "../../model/authorize-post";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import MappingUtils from "../../model/mapping-utils";
import {User} from "../../model/user";
import {CreateUserPost} from "../../model/create-user-post";
import CreateUserStatus from "../../model/create-user-status";


@Injectable()
export class AuthenticationService {
    private authUrl;
    private userUrl;

    constructor(
        private httpClient: HttpClient
    ) {
        this.authUrl = environment.apiUrl + "auth";
        this.userUrl = environment.apiUrl + "user";
    }


    getToken(): String {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var token = currentUser && currentUser.token;
        return token;
    }

    login(username: string, password: string): Observable<boolean> {
        // prepare device info
        var deviceInfo = new UserDeviceInfo();
        deviceInfo.client_type = "Web";
        var authorizePost = new AuthorizePost();
        authorizePost.password = password;
        authorizePost.username = username;
        authorizePost.device_info = deviceInfo
        return this.httpClient.post(this.authUrl, JSON.stringify(authorizePost))
            .pipe(map((response: HttpResponse<any>) => {
                    // login successful if there's a jwt token in the response
                    let user = MappingUtils.toUser(response);

                    if (user) {
                        // store username and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(user));

                        // return true to indicate successful login
                        return true;
                    } else {
                        return false;
                    }
                }),
                catchError(this.handleError));
    }


    createUser(username: string, password: string): Observable<CreateUserStatus> {
        // prepare device info
        let deviceInfo = new UserDeviceInfo();
        deviceInfo.client_type = "Web";
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
                        // store username and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(user));

                        // return true to indicate successful login
                        return CreateUserStatus.Success;
                    } else {
                        return CreateUserStatus.UnknownError;
                    }
                }),
                catchError(this.handleError));
    }


    nameIsTaken(userName: string): Observable<boolean> {
        var requestUrl = this.userUrl + '/name?name=' + userName

        return this.httpClient.get(requestUrl)
            .pipe(map((response: HttpResponse<any>) => {
                    // login successful if there's a jwt token in the response
                    if (!response) {
                        return false;
                    }
                    return true;
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
}
