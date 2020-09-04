import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import MappingUtils from "../../model/mapping-utils";
import {IShoppingList} from "../../model/shoppinglist";
import {NGXLogger} from "ngx-logger";

@Injectable()
export class ListService {
    private authUrl;
    private userUrl;
    private listUrl;


    constructor(
        private httpClient: HttpClient,
        private logger: NGXLogger
    ) {
        this.authUrl = environment.apiUrl + "auth";
        this.userUrl = environment.apiUrl + "user";
        this.listUrl = environment.apiUrl + "shoppinglist";
    }


    getAllLists(): Observable<IShoppingList[]> {
        this.logger.debug("Retrieving all shopping lists for user.");

        return this.httpClient.get(this.listUrl)
            .pipe(map((response: HttpResponse<any>) => {
                    // map and return
                    return this.mapShoppingLists(response);
                }),
                catchError(this.handleError));
    }

    /*
      login(username: string, password: string): Observable<boolean> {
          AuthenticationService.clearToken();
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

     */


    handleError(error: any) {
        // log error
        // could be something more sophisticated
        let errorMsg = error.message || `Yikes! There was a problem with our hyperdrive device and we couldn't retrieve your data!`
        console.error(errorMsg);

        // throw an application level error
        return throwError(error);
    }


    mapShoppingLists(object: Object): IShoppingList[] {
        let embeddedObj = object["_embedded"];
        if (embeddedObj) {
            return embeddedObj["shoppingListResourceList"].map(MappingUtils.toShoppingList);
        }
        return null;
    }


}
