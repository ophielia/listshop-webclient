import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import MappingUtils from "../../model/mapping-utils";
import {IShoppingList} from "../../model/shoppinglist";
import {NGXLogger} from "ngx-logger";
import {CreateListPost} from "../../model/create-list-post";
import {IItem} from "../../model/item";

@Injectable()
export class ListService {
    private authUrl;
    private userUrl;
    private listUrl;

    public static DEFAULT_LIST_NAME: string = "Shopping List";

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

    getById(shoppingListId: string): Observable<IShoppingList> {
        this.logger.debug("Retrieving shopping lists for id:" + shoppingListId);
        var url = this.listUrl + "/" + shoppingListId;

        return this.httpClient.get(url)
            .pipe(map((response: HttpResponse<any>) => {
                    // map and return
                    return this.mapShoppingList(response);
                }),
                catchError(this.handleError));
    }

    deleteList(list_id: string) {
        var url = this.listUrl + "/" + list_id;
        return this.httpClient.delete(url);
    }

    createList(listName: string): Observable<Object> {


        var createListPost = new CreateListPost();
        createListPost.is_starter_list = false;
        createListPost.name = listName;

        return this.httpClient.post(this.listUrl, JSON.stringify(createListPost));
    }

    static getCrossedOff(shoppingList: IShoppingList):IItem[] {
        if (!shoppingList.categories || shoppingList.categories.length == 0) {
            return [];
        }

        let allofthem = shoppingList.categories
            .map(c => c.items.filter(i => i.crossed_off));


        return allofthem
            .reduce(function(a,b){ return a.concat(b) }, []);
    }
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

    mapShoppingList(object: Object): IShoppingList {
        if (object) {
            return MappingUtils.toShoppingList(object);
        }
        return null;
    }

}
