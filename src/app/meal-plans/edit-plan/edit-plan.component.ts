import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {LandingFixService} from "../../shared/services/landing-fix.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Meta, Title} from "@angular/platform-browser";
import {Subscription} from "rxjs";
import {DishService} from "../../shared/services/dish.service";
import {NGXLogger} from "ngx-logger";
import {ListService} from "../../shared/services/list.service";
import {MealPlanService} from "../../shared/services/meal-plan.service";
import {ITag} from "../../model/tag";
import {MealPlan} from "../../model/mealplan";
import {Dish} from "../../model/dish";
import {User} from "../../model/user";


@Component({
    selector: 'app-edit-plan',
    templateUrl: './edit-plan.component.html',
    styleUrls: ['./edit-plan.component.scss']
})
export class EditPlanComponent implements OnInit, OnDestroy {
    @ViewChild('addtagstodishesmodal') addTagsToDishesModal;

    unsubscribe: Subscription[] = [];
    showChangeName: boolean = false;
    mealPlan: MealPlan;
    mealPlanName: string;
    dishSearchValue: string;
    showActions: boolean;
    removedDishes: Dish[];

    testDish: Dish = <Dish>({
        name: "test dish",
        description : "description",
        reference : "142",
    })

    constructor(
        private fix: LandingFixService,
        private route: ActivatedRoute,
        private router: Router,
        private title: Title,
        private meta: Meta,
        private logger: NGXLogger
    ) {
        this.testDish.name = "Test Dish";
        this.testDish.description = "Description";
        this.testDish.reference = "Refreference";
    }

    ngOnInit() {
        // this.fix.addFixBlogDetails();
        this.title.setTitle(this.route.snapshot.data['title']);
        this.route.params.subscribe(params => {
            let id = params['id'];
            this.logger.debug('getting plan with id: ', id);
            this.getPlan(id);
        });
    }

    ngOnDestroy() {
        this.unsubscribe.forEach(s => s.unsubscribe());
    }

    private getPlan(id: any) {
        // todo fill in
    }

    savePlanName() {

    }

    toggleShowChangeName() {
        
    }

    filterByDishname() {
        
    }

    clearSearchValue() {
        
    }

    addTagToFilter($event: ITag) {
        
    }

    changeSort() {
        
    }

    changeSortDirection() {
        
    }

    toggleShowOrderBy() {
        
    }

    removeTagFromFilter(tag: any) {
        
    }

    toggleShowActions() {
        this.showActions = !this.showActions;
    }

    reAddDish(dish: Dish) {
        
    }

    clearRemoved() {

    }

    removeDishFromPlan($event: String) {
        
    }
}
