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
import {IShoppingListPut, ShoppingListPut} from "../../model/shoppinglistput";
import {IMealPlan, MealPlan} from "../../model/mealplan";




@Injectable()
export class MealPlanService {
  private authUrl;
  private userUrl;
  private mealplanUrl;

  public static DEFAULT_LIST_NAME: string = "Shopping List";

  constructor(
      private httpClient: HttpClient,
      private logger: NGXLogger
  ) {
    this.authUrl = environment.apiUrl + "auth";
    this.userUrl = environment.apiUrl + "user";
    this.mealplanUrl = environment.apiUrl + "mealplan";
  }

  getAllMealplans(): Promise<IMealPlan[]> {
    this.logger.debug("Retrieving all mealplans for user.");

    return this.httpClient.get(this.mealplanUrl)
        .pipe(map((response: HttpResponse<any>) => {
              // map and return
              return this.mapMealPlans(response);
            }),
            catchError(this.handleError))
        .toPromise();
  }

  private mapMealPlans(object: Object): MealPlan[] {
    let embeddedObj = object["_embedded"];
    return embeddedObj["mealPlanResourceList"].map(MappingUtils.toMealPlan);
  }

  handleError(error: any) {
    // log error
    // could be something more sophisticated
    let errorMsg = error.message || `Yikes! There was a problem with our hyperdrive device and we couldn't retrieve your data!`
    console.error(errorMsg);

    // throw an application level error
    return throwError(error);
  }
 /* getAll(): Observable<MealPlan[]> {
    let mealplans$ = this.httpClient
      .get(`${this.baseUrl}`)
      .map(data => this.mapMealPlansClient(data));
    return mealplans$;
  }

  getById(meal_plan_id: string) {
    let url = this.baseUrl + "/" + meal_plan_id;
    return this.httpClient.get(url).pipe(
      map(data => this.mapMealPlanClient(data)));
  }

  private mapMealPlansClient(object: Object): MealPlan[] {
    let embeddedObj = object["_embedded"];
    return embeddedObj["mealPlanResourceList"].map(MappingUtils.toMealPlan);
    //return new Array<MealPlan>();
    //return response.json()._embedded.mealPlanResourceList.map(MappingUtils.toMealPlan);
  }

  private mapMealPlanClient(object: Object): MealPlan {
    return MappingUtils.toMealPlan(object);
  }


  removeDishFromMealPlan(dish_id: string, meal_plan_id: string): Observable<any> {
    var url: string = this.baseUrl + '/' + meal_plan_id + "/dish/" + dish_id;

    return this
      .httpClient
      .delete(`${url}`);
  }

  removeDishesFromMealPlan(dish_ids: string[], meal_plan_id: string): Observable<any> {
    return from(dish_ids).pipe(
      concatMap((id, index) => {
          return <Observable<any>>  this.removeDishFromMealPlan(dish_ids[index], meal_plan_id);
        }
      ));


  }

  addDishToMealPlan(dish_id: string, meal_plan_id: string): Observable<any> {
    var url: string = this.baseUrl + '/' + meal_plan_id + "/dish/" + dish_id;

    return this
      .httpClient
      .post(`${url}`, null);
  }


  addDishesToMealPlan(dish_ids: string[], meal_plan_id: string) {
    // check if this will be a new mealplan (meal_plan_id empty or null)

    var chain$ = this.addDishToMealPlan(dish_ids[0], meal_plan_id);

    if (dish_ids.length == 1) {
      return chain$;
    }

    for (var i = 1; i < dish_ids.length; i++) {
      chain$ = chain$.merge(this.addDishToMealPlan(dish_ids[i], meal_plan_id));
    }
    return chain$;
  }

  addMealPlan(mealPlanName: string): Observable<HttpResponse<Object>> {
    var newMealPlan: MealPlan = <MealPlan>({
      name: mealPlanName,
      meal_plan_type: MealPlanType.Manual
    });

    var url: string = this.baseUrl + '';


    return this
      .httpClient
      .post(`${url}`,
        JSON.stringify(newMealPlan),
        {headers: myHeaders, observe: 'response'});
  }

  deleteMealPlan(mealPlanId: string) {
    var url: string = this.baseUrl + '/' + mealPlanId;

    return this
      .httpClient
      .delete(`${url}`);
  }


  generateMealPlan(proposalId: string) {
    let url = this.baseUrl + "/proposal/"
      + proposalId;


    let proposal$ = this.httpClient
      .post(`${url}`,
        null,
        {headers: myHeaders, observe: 'response'});
    return proposal$;
  }

  renameMealPlan(meal_plan_id: string, mealPlanName: string) {
    // just filling in here
    let url = this.baseUrl + "/" + meal_plan_id + "/name/" + encodeURIComponent(mealPlanName);


    let mealplan$ = this.httpClient
      .post(`${url}`,
        null);
    return mealplan$;
  }

/*  getRatingInfoForMealPlan(meal_plan_id: string): Observable<RatingUpdateInfo> {
    let dish$ = this.httpClient
      .get(`${this.baseUrl}/${meal_plan_id}/ratings`)
      .map(data => this.mapRatingUpdateInfo(data));
    return dish$;
  }

  private mapRatingUpdateInfo(object: Object): RatingUpdateInfo {
    return MappingUtils.toRatingUpdateInfo(object);
  }
*/
}


