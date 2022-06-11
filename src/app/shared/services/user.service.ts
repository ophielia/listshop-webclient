import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {UserDeviceInfo} from "../../model/user-device-info";
import {AuthorizePost} from "../../model/authorize-post";
import {from, Observable, of, throwError} from "rxjs";
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
import {MealPlan} from "../../model/mealplan";
import {UserProperty} from "../../model/userproperty";
import {UserPropertiesPost} from "../../model/user-properties-post";


@Injectable()
export class UserService {
    public static NOTIFIED_ON_RELEASE = "notified_on_release";
    public static REQUEST_TEST_INFO = "request_test_info";
    public static TEST_EMAILS_SENT = "test_info_sent";

    private userUrl;

    constructor(
        private httpClient: HttpClient
    ) {
        this.userUrl = environment.apiUrl + "user";
    }


    getUserProperties(): Promise<UserProperty[]> {
        var requestUrl = this.userUrl + '/properties'

        return this.httpClient.get(requestUrl)
            .pipe(map((response: HttpResponse<any>) => {
                    // map and return
                    return UserService.mapUserProperties(response);
                }),
                catchError(this.handleError))
            .toPromise();
    }


    setUserProperty(property: UserProperty): Promise<Object> {
         var propertyArray = [property];
         return this.setUserProperties(propertyArray);
    }

    setUserProperties(propertyArray: UserProperty[]): Promise<Object> {
        var requestUrl = this.userUrl + '/properties'

        var propertyPost = new UserPropertiesPost();
        propertyPost.user_properties = propertyArray;

        return this.httpClient.post(requestUrl, JSON.stringify(propertyPost))
            .pipe(map((response: HttpResponse<any>) => {
                    // map and return
                    return "success";
                }),
                catchError(this.handleError))
            .toPromise();
    }

    handleError(error: any) {
        // log error
        // could be something more sophisticated
        let errorMsg = error.message || `Yikes! There was a problem with our hyperdrive device and we couldn't retrieve your data!`
        console.error(errorMsg);

        // throw an application level error
        return throwError(error);
    }

    private static mapUserProperties(object: Object): UserProperty[] {
        return object["user_properties"].map(MappingUtils.toUserProperty);
    }

    private static mapUserProperty(object: Object): UserProperty {
        return MappingUtils.toUserProperty(object);
    }

}
