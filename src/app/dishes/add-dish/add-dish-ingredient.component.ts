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
import {GroupType} from "../../shared/services/tag-tree.object";


@Component({
    selector: 'app-add-dish-ingredient',
    templateUrl: './add-dish-ingredient.component.html',
    styleUrls: ['./add-dish-ingredient.component.scss']
})
export class AddDishIngredientComponent implements OnInit, OnDestroy {
    @ViewChild('addtag') addTagModel;
    @ViewChild('dishesaddedtolist') addToListModal;
    @ViewChild('dishesaddedtomealplan') addToMealPlanModal;
    @ViewChild('addtagstodishesmodal') addTagsToDishesModal;

    unsubscribe: Subscription[] = [];
    isLoading: boolean = true;

    dish: Dish;
    ingredientTags: Tag[] = [];

    showAddIngredient: boolean = false;
    showPlainTag: boolean = false;
    showAddDishType: boolean = false;
    ingredientGroupType: GroupType = GroupType.ExcludeGroups;

    dishName: string ;
    dishDescription : string;
    dishReference : string;

    private errorMessage: string;
    private tagNameToCreate: string;
    private tagTypeToCreate: TagType;

    constructor(
        private fix: LandingFixService,
        private route: ActivatedRoute,
        private router: Router,
        private title: Title,
        private meta: Meta,
        private dishService: DishService,
        private mealPlanService: MealPlanService,
        private listService: ListService,
        private logger: NGXLogger
    ) {
    }

    ngOnInit() {
        // this.fix.addFixBlogDetails();
        this.title.setTitle(this.route.snapshot.data['title']);
        this.route.params.subscribe(params => {
            let id = params['id'];
            this.logger.debug('getting list with id: ', id);
            this.getDish(id);
        });
    }

    ngOnDestroy() {
        this.unsubscribe.forEach(s => s.unsubscribe());
    }

    getDish(dishId: string) {

        this.dishService
            .getDish(dishId)
            .subscribe(p => {
                    this.dish = p;
                    this.isLoading = false;
                    this.dishName = this.dish.name;
                    this.dishReference = this.dish.reference;
                    this.dishDescription = this.dish.description;
                    this.pullIngredientTags();
                },
                e => this.errorMessage = e);
    }

    pullIngredientTags() {
        this.ingredientTags =  this.dish.tags.filter(t => t.tag_type == TagType.Ingredient);
    }


    toggleAddIngredient() {
        this.showAddIngredient = !this.showAddIngredient;
        if (this.showAddIngredient) {
            this.showPlainTag = false;
            this.showAddDishType = false;
        }
    }

    addTagToDish(tag: Tag) {
this.addTagToDishById(tag.tag_id);
    }

    removeTagFromDish(tag: Tag) {
        // add tag to list as item in back end
        this.logger.debug("removing tag [" + tag.tag_id + "] to dish");

        let $sub = this.dishService
            .removeTagFromDish(this.dish.dish_id, tag.tag_id)
            .subscribe(p => {
                this.getDish(this.dish.dish_id);
            });
        this.unsubscribe.push($sub);


    }


    createTag(tag: ITag) {
        this.tagNameToCreate = tag.name;
        this.tagTypeToCreate = tag.tag_type;
        this.addTagModel.show();

    }

    addTagToDishById(tagId: string) {
        // add tag to list as item in back end
        this.logger.debug("adding tag [" + tagId + "] to dish");
        this.addTagModel.hide();
        let $sub = this.dishService
            .addTagToDish(this.dish.dish_id, tagId)
            .subscribe(p => {
                this.getDish(this.dish.dish_id);
            });
        this.unsubscribe.push($sub);

        this.showAddIngredient = false;
        this.showPlainTag = false
        this.showAddDishType = false
    }
}
