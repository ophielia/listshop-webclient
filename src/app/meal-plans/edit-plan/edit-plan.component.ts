import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {LandingFixService} from "../../shared/services/landing-fix.service";
import {ListService} from "../../shared/services/list.service";
import {ShoppingList} from "../../model/shoppinglist";
import {Subscription} from "rxjs";
import {LegendService} from "../../shared/services/legend.service";
import {LegendPoint} from "../../model/legend-point";
import {NGXLogger} from "ngx-logger";
import {Dish, IDish} from "../../model/dish";
import {DishService} from "../../shared/services/dish.service";
import {MealPlanService} from "../../shared/services/meal-plan.service";
import {MealPlan} from "../../model/mealplan";

@Component({
    selector: 'app-edit-plan',
    templateUrl: './edit-plan.component.html',
    styleUrls: ['./edit-plan.component.scss']
})
export class EditPlanComponent implements OnInit, OnDestroy {
    @ViewChild('mealplancopied') copiedMealPlanModal;

    private unsubscribe: Subscription[] = [];

    crossedOffExist: boolean;
    listLegendMap: Map<string, LegendPoint>;
    legendList: LegendPoint[] = [];
    showCrossedOff: boolean = true;
    showActions: boolean = true;
    showAddDish: boolean = false;
    showAddToList: boolean = false;
    showChangeName: boolean = false;
    shoppingListIsStarter: boolean = false;
    private originalName: string = null;
    shoppingListName: string = "";
    allDishes: IDish[];
    errorMessage: any;

    shoppingList: ShoppingList;

    mealPlan: MealPlan;
    planDishes: Dish[];

    copiedId: String;


    constructor(
        private fix: LandingFixService,
        private route: ActivatedRoute,
        private title: Title,
        private meta: Meta,
        private router: Router,
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
                this.mealPlan.slots.forEach(s => this.planDishes.push(s.dish));

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

    iconSourceForKey(key: string, withCircle: boolean): string {
        let circleOrColor = withCircle ? "circles" : "colors"
        // assets/images/legend/colors/blue/bowl.png
        let point = this.listLegendMap.get(key);
        if (!point) {
            return null;
        }
        return "assets/images/listshop/legend/" + circleOrColor + "/" + point.color + "/" + point.icon + ".png";
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

    addDishToPlan(dish: any) {
        let $sub = this.mealPlanService.addDishToMealPlan(dish.dish_id, this.mealPlan.meal_plan_id)
            .subscribe(() => {
                this.getMealPlan(this.mealPlan.meal_plan_id);
                this.showAddDish = false;
            });
        this.unsubscribe.push($sub);
    }

    goToDishSelect() {
        var url = "mealplans/edit/" + this.mealPlan.meal_plan_id + "/dish";
        this.router.navigateByUrl(url);
    }

    toggleAddDish() {
        // hide other inputs
        if (!this.showAddDish) {
            // start with all inputs hidden
            this.hideAllAddInputs();
        }
        this.showAddDish = !this.showAddDish;
    }

    private hideAllAddInputs() {
        this.showAddDish = false;
        this.showAddToList = false;
        this.showChangeName = false;
    }

    copyMealPlan() {
        let $sub = this.mealPlanService.copyMealPlan(this.mealPlan.meal_plan_id)
            .subscribe(r => {
                var headers = r.headers;
                var location = headers.get("Location");
                var splitlocation = location.split("/");
                var id = splitlocation[splitlocation.length - 1];
                this.copiedId = id;
                this.copiedMealPlanModal.show();
            });
        this.unsubscribe.push($sub);

    }

    showCopiedMealPlan() {
        var url = "mealplans/edit/" + this.copiedId;
        this.router.navigateByUrl(url);
    }
}
