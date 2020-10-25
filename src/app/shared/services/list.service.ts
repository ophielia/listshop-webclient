import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import MappingUtils from "../../model/mapping-utils";
import {IShoppingList} from "../../model/shoppinglist";
import {NGXLogger} from "ngx-logger";
import {CreateListPost} from "../../model/create-list-post";
import {IItem, Item} from "../../model/item";
import {ItemOperationPut} from "../../model/item-operation-put";
import {ITag} from "../../model/tag";

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

    removeItemFromShoppingList(shoppingList_id: string,
                               item_id: string,
                               tag_id: string): Observable<Object> {

        var tagIds: Array<string> = [tag_id];
        let itemOperation = <ItemOperationPut>({
                destination_list_id: '0',
                operation: 'Remove',
                tag_ids: tagIds
            }
        );
        var url: string = this.listUrl + "/" + shoppingList_id + "/item"
        var payload = JSON.stringify(itemOperation);

        return this.httpClient.put(url, payload);
    }

    setItemCrossedOff(shoppingList_id: string,
                               item_id: string,
                               crossedOff: boolean): Observable<Object> {

        var url: string = this.listUrl + "/" + shoppingList_id + "/item/shop/" + item_id + "?crossOff=" + crossedOff

        return this.httpClient.post(url, null);
    }

    addTagItemToShoppingList(shoppingList_id: string, tag: ITag): Observable<Object> {
        let item: Item = <Item>{tag_id: tag.tag_id};
        let url = this.listUrl + "/" + shoppingList_id + "/tag/" + tag.tag_id

        return this.httpClient.post(url, item);
    }

    addDishToShoppingList(shoppingList_id: string, dish_id: string): Observable<Object> {
        let url = this.listUrl + "/" + shoppingList_id + "/dish/" + dish_id;
        return this
            .httpClient
            .post(url,null);
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
