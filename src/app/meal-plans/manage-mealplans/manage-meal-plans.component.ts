import {Component, OnDestroy, OnInit} from '@angular/core';
import {LandingFixService} from "../../shared/services/landing-fix.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Meta, Title} from "@angular/platform-browser";
import {Subscription} from "rxjs";
import {finalize} from "rxjs/operators";
import {MealPlan} from "../../model/mealplan";
import {MealPlanService} from "../../shared/services/meal-plan.service";
import {PlanContext} from "../plan-context/plan-context";
import {ConfirmDialogService} from "../../shared/services/confirm-dialog.service";

@Component({
    selector: 'app-manage-meal-plans',
    templateUrl: './manage-meal-plans.component.html',
    styleUrls: ['./manage-meal-plans.component.scss'],
    standalone: false
})
export class ManageMealPlansComponent implements OnInit, OnDestroy {
    unsubscribe: Subscription[] = [];

    isLoading: boolean = true;
    isCreatingMealPlan = false;
    creationError: string = null;
    mealPlans: MealPlan[];
    private mealPlanIdToDelete: string;

    constructor(
        private fix: LandingFixService,
        private route: ActivatedRoute,
        private router: Router,
        private title: Title,
        private meta: Meta,
        private mealPlanService: MealPlanService,
        private mealPlanContext: PlanContext,
        private confirmDialogService: ConfirmDialogService
    ) {
    }

    ngOnInit() {
        // this.fix.addFixBlogDetails();
        this.title.setTitle(this.route.snapshot.data['title']);
        this.getMealPlans()
    }

    ngOnDestroy() {
        this.unsubscribe.forEach(s => s.unsubscribe());
    }


    getMealPlans() {

        let sub$ = this.mealPlanService
            .getAllMealplans()
            .subscribe(p => {
                if (p) {
                    this.mealPlans = p.meal_plan_list;
                    let ids = p.meal_plan_list.map(mp => mp.meal_plan_id);
                    this.mealPlanContext.setMealPlanIds(ids);
                    this.mealPlanIdToDelete = null;
                    this.isLoading = false;
                }
            });
        this.unsubscribe.push(sub$);
    }

    deleteMealPlan(mealPlanId: string) {
        this.mealPlanIdToDelete = mealPlanId;
        this.confirmDialogService.confirmThis("Are you sure you'd like to delete this meal plan?",
            () => {
                console.log("dummy");
                this.doDeleteMealPlan();
            },
            function () {
            })

    }

    public doDeleteMealPlan() {
        if (!this.mealPlanIdToDelete) {
            return;
        }
        let sub$ = this.mealPlanService
            .deleteMealPlan(this.mealPlanIdToDelete)
            .subscribe(l => this.getMealPlans());
        this.unsubscribe.push(sub$);
    }

    editMealPlan(listId: String) {
        // console.log("planId + " + planId)
        var url = "mealplans/edit/" + listId;
        console.log("to this url" + this.router.navigateByUrl(url));

    }

    createMealPlan() {
        if (this.isCreatingMealPlan) {
            return;
        }
        this.isCreatingMealPlan = true;
        this.creationError = null;
        let sub$ = this.mealPlanService
            .addMealPlan("")
            .pipe(finalize(() => this.isCreatingMealPlan = false))
            .subscribe({
                next: response => {
                    const location = response.headers.get('Location');
                    const id = location?.split(/[?#]/)[0].split('/').filter(Boolean).pop();
                    if (!id) {
                        this.creationError = 'The meal plan was created, but could not be opened. Please refresh the list to find it.';
                        return;
                    }
                    this.editMealPlan(id);
                },
                error: () => {
                    this.creationError = 'Could not create the meal plan. Please try again.';
                }
            });
        this.unsubscribe.push(sub$);
    }

}
