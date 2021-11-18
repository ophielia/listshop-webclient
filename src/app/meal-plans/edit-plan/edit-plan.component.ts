import {Component, OnDestroy, OnInit} from '@angular/core';
import {Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {LandingFixService} from "../../shared/services/landing-fix.service";
import {ListService} from "../../shared/services/list.service";
import {IShoppingList, ShoppingList} from "../../model/shoppinglist";
import {Subscription} from "rxjs";
import {LegendService} from "../../shared/services/legend.service";
import {LegendPoint} from "../../model/legend-point";
import {Category, ICategory} from "../../model/category";
import {IItem, Item} from "../../model/item";
import {Tag} from "../../model/tag";
import {NGXLogger} from "ngx-logger";
import {Dish, IDish} from "../../model/dish";
import {DishService} from "../../shared/services/dish.service";
import {MealPlanService} from "../../shared/services/meal-plan.service";
import {IMealPlan, MealPlan} from "../../model/mealplan";

@Component({
    selector: 'app-edit-plan',
    templateUrl: './edit-plan.component.html',
    styleUrls: ['./edit-plan.component.scss']
})
export class EditPlanComponent implements OnInit, OnDestroy {
    private unsubscribe: Subscription[] = [];

    crossedOffExist: boolean;
    listLegendMap: Map<string, LegendPoint>;
    legendList: LegendPoint[] = [];
    showCrossedOff: boolean = true;
    showActions: boolean = true;
    showAddDish: boolean = false;
    showAddList: boolean = false;
    showFrequent: boolean = true;
    showChangeName: boolean = false;
    shoppingListIsStarter: boolean = false;
    private originalName: string = null;
    shoppingListName: string = "";
    allDishes: IDish[];
    errorMessage: any;

    shoppingList: ShoppingList;
    removedItems: IItem[] = [];

    mealPlan: MealPlan;
    planDishes: Dish[];



    constructor(
        private fix: LandingFixService,
        private route: ActivatedRoute,
        private title: Title,
        private meta: Meta,
        private listService: ListService,
        private dishService: DishService,
        private mealPlanService: MealPlanService,
        public legendService: LegendService,
        private logger: NGXLogger,
    ) {
    }

    ngOnInit() {

        this.title.setTitle(this.route.snapshot.data['title']);
        this.route.params.subscribe(params => {
            let id = params['id'];
            this.logger.debug('getting list with id: ', id);
            this.getMealPlan(id);
        });
        this.getAllDishes();
    }

    ngOnDestroy() {
        //this.fix.removeFixBlog();
        this.unsubscribe.forEach(s => s.unsubscribe())
    }

    getMealPlan(id: string) {
        let $sub = this.mealPlanService
            .getMealPlan(id)
            .subscribe(p => {
                this.mealPlan = p;
                this.planDishes = [];
                this.mealPlan.slots.forEach( s => this.planDishes.push(s.dish));

            });
        this.unsubscribe.push($sub);
    }

    getAllDishes() {
        this.dishService.getAllDishes()
            .subscribe(p => {
                    this.allDishes = p;
                },
                e => this.errorMessage = e);

    }

    saveListName() {
        this.showChangeName = false;
        this.originalName = null;
        this.shoppingList.name = this.shoppingListName;
        let promise = this.listService.updateShoppingListName(this.shoppingList)
        promise.then(data => {
            this.getMealPlan(this.shoppingList.list_id);
        });

    }

    clearList() {
        this.showFrequent = false;
        let promise = this.listService.removeAllItemsFromList(this.shoppingList.list_id);
        promise.then(data => {
            this.getMealPlan(this.shoppingList.list_id)
        });
    }

    iconSourceForKey(key: string, withCircle: boolean): string {
        let circleOrColor = withCircle ? "circles" : "colors"
        // assets/images/legend/colors/blue/bowl.png
        let point = this.listLegendMap.get(key);
        if (!point) {
            return null;
        }
        return "assets/images/listshop/legend/" + circleOrColor + "/" + point.color + "/" + point.icon + ".png";
    }

    clearRemoved() {
        this.removedItems = []
    }

    addTagToList(tag: Tag) {
        // add tag to list as item in back end
        this.logger.debug("adding tag [" + tag.tag_id + "] to list");
        let promise = this.listService.addTagItemToShoppingList(this.shoppingList.list_id, tag);

        promise.then((data) => {
            this.getMealPlan(this.shoppingList.list_id);
        }).catch((error) => {
            console.log("Promise rejected with " + JSON.stringify(error));
        });
    }

    reAddItem(item: IItem) {
        this.removedItems = this.removedItems.filter(i => i.item_id != item.item_id);
        if (item.tag) {
            this.addTagToList(item.tag);
        }
    }

    toggleShowActions() {
        this.showActions = !this.showActions;
    }

    toggleShowChangeName() {
        this.showChangeName = !this.showChangeName;
        if (this.showChangeName) {
            // save original value
            this.originalName = this.shoppingList.name;
            this.shoppingListName = this.shoppingList.name;
        } else if (this.originalName != null) {
            this.originalName = null;
        }
    }

    beep(dishId: String) {
        
    }
}
