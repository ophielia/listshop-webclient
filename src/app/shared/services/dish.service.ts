import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {forkJoin, Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import MappingUtils from "../../model/mapping-utils";
import {NGXLogger} from "ngx-logger";
import {Dish} from "../../model/dish";

@Injectable()
export class DishService {
    private dishUrl;

    constructor(
        private httpClient: HttpClient,
        private logger: NGXLogger
    ) {
        this.dishUrl = environment.apiUrl + "dish";
    }


    getAllDishes() {
        this.logger.debug("Retrieving all dishes for user.");

        return this.httpClient.get(this.dishUrl)
            .pipe(map((response: HttpResponse<any>) => {
                    // map and return
                    return DishService.mapDishes(response);
                }),
                catchError(DishService.handleError));
    }

    getDish(dishId: string) {
        this.logger.debug("Retrieving dish [" + dishId + "] for user.");

        let url = this.dishUrl + "/" + dishId
        return this.httpClient.get(url)
            .pipe(map((response: HttpResponse<any>) => {
                    // map and return
                    return DishService.mapDish(response);
                }),
                catchError(DishService.handleError));
    }

    findByTags(inclList: string[], exclList: string[]) {
        var inclString = "";
        if (inclList) {
            inclString = inclList.join(",");

        }
        var exclString = "";
        if (exclList) {
            exclString = exclList.join(",");

        }

        var url = this.dishUrl;
        if (inclString.length > 0) {
            url = url + "?includedTags=" + inclString;
        }
        if (exclString.length > 0) {
            url = url +
                (inclString.length > 0 ? "&" : "?") + "excludedTags=" + exclString;
        }
        return this.httpClient.get(url)
            .pipe(map((response: HttpResponse<any>) => {
                    // map and return
                    return DishService.mapDishes(response);
                }),
                catchError(DishService.handleError));
    }

    addTagToDishes(dish_ids: string[], tag_id: string) : Promise<Object> {
        if (dish_ids.length == 1) {
            return this.addTagToDish(dish_ids[0], tag_id).toPromise();
        }

        const observablesForDishes = dish_ids.map(id => {
            return this.addTagToDish(id, tag_id)
        });

        return forkJoin(observablesForDishes).toPromise();
    }

    addTagToDish(dish_id: string, tag_id: string): Observable<Object> {
        return this
            .httpClient
            .post(`${this.dishUrl}/${dish_id}/tag/${tag_id}`, null);
    }

    removeTagFromDish(dish_id: string, tag_id: string): Observable<Object> {
        return this
            .httpClient
            .delete(`${this.dishUrl}/${dish_id}/tag/${tag_id}`);
    }

    private static handleError(error: any) {
        // log error
        // could be something more sophisticated
        let errorMsg = error.message || `Yikes! There was a problem with our hyperdrive device and we couldn't retrieve your data!`
        console.error(errorMsg);

        // throw an application level error
        return throwError(error);
    }

    private static mapDishes(object: Object): Dish[] {
        let embeddedObj = object["_embedded"];
        if (embeddedObj) {
            return embeddedObj["dishResourceList"].map(MappingUtils.toDish);
        } else
            return [];
    }

    private static mapDish(object: Object): Dish {
        return MappingUtils.toDish(object);
    }


}
