import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {LandingFixService} from "../../shared/services/landing-fix.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Meta, Title} from "@angular/platform-browser";
import {Subscription} from "rxjs";
import {Dish} from "../../model/dish";
import {DishService} from "../../shared/services/dish.service";
import {ITag, Tag} from "../../model/tag";
import {NGXLogger} from "ngx-logger";
import {ListService} from "../../shared/services/list.service";
import {MealPlanService} from "../../shared/services/meal-plan.service";
import TagType from "../../model/tag-type";
import {IRatingInfo, RatingInfo} from "../../model/rating-info";
import {DishRatingInfo} from "../../model/dish-rating-info";
import {ContentType, GroupType, TagTree} from "../../shared/services/tag-tree.object";
import {TagTreeService} from "../../shared/services/tag-tree.service";
import TagSelectType from "../../model/tag-select-type";


@Component({
    selector: 'app-add-dish',
    templateUrl: './add-dish.component.html',
    styleUrls: ['./add-dish.component.scss']
})
export class AddDishComponent implements OnInit, OnDestroy {
    @ViewChild('dishesaddedtolist') addToListModal;
    @ViewChild('dishesaddedtomealplan') addToMealPlanModal;
    @ViewChild('addtagstodishesmodal') addTagsToDishesModal;

    unsubscribe: Subscription[] = [];
    isLoading: boolean = false;

    dishTypeList: ITag[];

    dish: Dish;
    dishTypeTags: Tag[] = [];

    dishName: string ;
    dishDescription : string;
    dishReference : string;

    private errorMessage: string;

    displayId: string;

    constructor(
        private fix: LandingFixService,
        private route: ActivatedRoute,
        private router: Router,
        private title: Title,
        private meta: Meta,
        private tagTreeService: TagTreeService ,
        private dishService: DishService ,
        private logger: NGXLogger
    ) {
    }

    ngOnInit() {
        // this.fix.addFixBlogDetails();
        this.title.setTitle(this.route.snapshot.data['title']);

        let $sub = this.tagTreeService.allContentList(TagTree.BASE_GROUP,
            ContentType.All, false, GroupType.ExcludeGroups, [TagType.DishType] , TagSelectType.All)
            .subscribe(data => {
                this.logger.debug("in subscribe in tag-select. data: " + data.length)
                this.dishTypeList = data;
                this.isLoading = false;
            });
        this.unsubscribe.push($sub);
    }

    ngOnDestroy() {
        this.unsubscribe.forEach(s => s.unsubscribe());
    }

    stringFieldEmpty(testField) {
        if (testField == null) {
            return true
        }
        return testField.trim().length == 0;
    }

    createDish(dishTypeTag: ITag) {
        if (this.dishName == null || (this.dishName.trim())=="") {
            this.logger.debug("Invalid - no name for the dish");
            return;
        }
        this.logger.debug("Creating new dish [" + this.dishName + "] with tag [" + dishTypeTag + "]");
        // put tags in dish
        let tags: ITag[] = [];
        tags.push(dishTypeTag);

        this.dishService.addDish(this.dishName, this.dishDescription, this.dishReference, tags)
            .subscribe(r => {
                    var headers = r.headers;
                    var location = headers.get("Location");
                    var splitlocation = location.split("/");
                    var id = splitlocation[splitlocation.length - 1];
                    //    this.getAllDishes();
                    this.router.navigate(['/dishes/edit/', id]);
                }, e => {
                    // an error occurred....

                }
            )
        ;
    }




}
