import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {UserDeviceInfo} from "../../model/user-device-info";
import {AuthorizePost} from "../../model/authorize-post";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import MappingUtils from "../../model/mapping-utils";


@Injectable()
export class AuthenticationService {
    private baseUrl;

    constructor(
        private httpClient: HttpClient
    ) {
        this.baseUrl = environment.apiUrl;
    }


    getToken(): String {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var token = currentUser && currentUser.token;
        return token;
    }

    login(username: string, password: string): Observable<boolean> {
        /*
        var httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Expose-Headers': 'Location',
            })
        }

         */
        // prepare device info
        var deviceInfo = new UserDeviceInfo();
        deviceInfo.client_type = "Web";
        var authorizePost = new AuthorizePost();
        authorizePost.password = password;
        authorizePost.username = username;
        authorizePost.device_info = deviceInfo
        return this.httpClient.post(this.baseUrl, JSON.stringify(authorizePost))
            .pipe(map((response: HttpResponse<any>) => {
                    // login successful if there's a jwt token in the response
                    let user = MappingUtils.toUser(response);

                    if (user) {
                        // store username and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(user));

                        // return true to indicate successful login
                        return true;
                    } else {
                        // return false to indicate failed login
                        return false;
                    }
                }),
                catchError((error: any) => throwError(error.json().error || 'Server error')))
            ;
    }
}
