import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {throwError} from "rxjs";
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
        this.logger.debug("Retrieving all shopping lists for user.");

        return this.httpClient.get(this.dishUrl)
            .pipe(map((response: HttpResponse<any>) => {
                    // map and return
                    return DishService.mapDishes(response);
                }),
                catchError(DishService.handleError));
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
