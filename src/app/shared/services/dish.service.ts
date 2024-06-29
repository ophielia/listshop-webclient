import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {forkJoin, Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import MappingUtils from "../../model/mapping-utils";
import {NGXLogger} from "ngx-logger";
import {Dish} from "../../model/dish";
import {RatingUpdateInfo} from "../../model/rating-update-info";
import {ITag} from "../../model/tag";
import {EnvironmentLoaderService} from "./environment-loader.service";
import {IIngredient} from "../../model/Ingredient";

@Injectable()
export class DishService {
    private dishUrl;
    private dishV2Url;

    constructor(
        private httpClient: HttpClient,
        private envLoader: EnvironmentLoaderService,
        private logger: NGXLogger
    ) {
        this.dishUrl =  envLoader.getEnvConfig().apiUrl + "dish";
        this.dishV2Url =  envLoader.getEnvConfig().apiUrl + "v2/dish";
    }


    getAllDishes() {
        this.logger.debug("Retrieving all dishes for user.");

        return this.httpClient.get(this.dishV2Url )
            .pipe(map((response: HttpResponse<any>) => {
                    // map and return
                    return DishService.mapDishes(response);
                }),
                catchError(DishService.handleError));
    }

    getDish(dishId: string) {
        this.logger.debug("Retrieving dish [" + dishId + "] for user.");

        let url = this.dishV2Url + "/" + dishId
        return this.httpClient.get(url)
            .pipe(map((response: HttpResponse<any>) => {
                    // map and return
                    return DishService.mapDish(response);
                }),
                catchError(DishService.handleError));
    }

    saveDish(dish: Dish): Observable<Object> {
        return this
            .httpClient
            .put(`${this.dishUrl}/${dish.dish_id}`,
                JSON.stringify(dish));
    }

    addDish(newDishName: string,
            description: string,
            reference: string,
            tags?: ITag[]): Observable<HttpResponse<Object>> {

        var newDish: Dish = <Dish>({
            name: newDishName,
            description: description,
            reference: reference
        });

        if (tags) {
            newDish.tags = tags;
        }

        return this
            .httpClient
            .post(`${this.dishUrl}`,
                JSON.stringify(newDish),
                {observe: 'response'});

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

    addIngredient(dish_id: string, ingredient: IIngredient): Observable<Object> {
        return this
            .httpClient
            .post(`${this.dishV2Url}/${dish_id}/ingredients`, JSON.stringify(ingredient));

    }

    updateIngredient(dish_id: string, ingredient: IIngredient): Observable<Object> {
        var ingredientEditObservables = new Array<Observable<Object>>();
        ingredientEditObservables.push(this.doUpdateIngredient(dish_id, ingredient));

        if (ingredient.original_tag_id  && ingredient.original_tag_id.trim().length > 0) {
            ingredientEditObservables.push(this.doRemoveIngredientFromDish(dish_id, ingredient.original_tag_id));
        }

        return forkJoin(ingredientEditObservables);
    }

    doUpdateIngredient(dish_id: string, ingredient: IIngredient): Observable<Object> {
        return this
            .httpClient
            .put(`${this.dishV2Url}/${dish_id}/ingredients`, JSON.stringify(ingredient));
    }

    removeTagFromDish(dish_id: string, tag_id: string): Observable<Object> {
        return this
            .httpClient
            .delete(`${this.dishUrl}/${dish_id}/tag/${tag_id}`);
    }

    removeIngredientFromDish(dish_id: string, ingredientId: string): Observable<Object> {
        return this
            .httpClient
            .delete(`${this.dishV2Url}/${dish_id}/ingredients/${ingredientId}`);
    }

    doRemoveIngredientFromDish(dish_id: string, ingredientId: string): Observable<Object> {
        return this
            .httpClient
            .delete(`${this.dishV2Url}/${dish_id}/ingredients/${ingredientId}`);
    }

    setDishRating(dish_id: string, rating_tag_id: number, power: number) {
        var url = this.dishUrl + "/" + dish_id + "/rating/" + rating_tag_id + "/" + power;
        return this
            .httpClient
            .put(url, null);
    }

    saveDishChanges(dish: Dish, dishDescription: string, dishReference: string, dishName: string) : Observable<Object>{
        // clip values to 255 characters
        dish.name = dishName.length > 255 ?  dishName.substr(0,255) : dishName;
        dish.reference = (dishReference && dishReference.length > 255) ?  dishReference.substr(0,255) : dishReference;
        dish.description = (dishDescription && dishDescription.length > 255) ?  dishDescription.substr(0,255) : dishDescription;
        return this.saveDish(dish);
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
            return embeddedObj["dish_list"].map(MappingUtils.toDish);
        } else
            return [];
    }

    private static mapDish(object: Object): Dish {
        return MappingUtils.toDish(object);
    }

    private static mapRatingUpdateInfo(object: Object): RatingUpdateInfo {
        return MappingUtils.toRatingUpdateInfo(object);
    }


}
