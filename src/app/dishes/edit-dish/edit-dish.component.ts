import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {LandingFixService} from "../../shared/services/landing-fix.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {Subject, Subscription} from "rxjs";
import {Dish} from "../../model/dish";
import {DishService} from "../../shared/services/dish.service";
import {Tag} from "../../model/tag";
import {NGXLogger} from "ngx-logger";
import TagType from "../../model/tag-type";
import {RatingInfo} from "../../model/rating-info";
import {DishRatingInfo} from "../../model/dish-rating-info";
import {GroupType} from "../../shared/services/tag-tree.object";
import {DishContext} from "../dish-context/dish-context";

import {RatingUpdateInfo} from "../../model/rating-update-info";
import {IIngredient, Ingredient} from "../../model/Ingredient";
import {TagTreeService} from "../../shared/services/tag-tree.service";


@Component({
    selector: 'app-edit-dish',
    templateUrl: './edit-dish.component.html',
    styleUrls: ['./edit-dish.component.scss']
})
export class EditDishComponent implements OnInit, OnDestroy {
    @ViewChild('addtag') addTagModel;
    @ViewChild('edittag') editTagModel;

    unsubscribe: Subscription[] = [];
    isLoading: boolean = true;

    private editedIngredient = new Subject<Ingredient>();
    editedIngredient$ = this.editedIngredient.asObservable();
    editId = "0";

    dish: Dish;
    dishTypeTags: Tag[] = [];
    ingredientTags: Ingredient[] = [];
    ratingTags: Tag[] = [];
    plainOldTags: Tag[] = [];

    showAddIngredient: boolean = false;
    showPlainTag: boolean = false;
    showAddDishType: boolean = false;
    showEditMainInfo: boolean = false;

    dishName: string;
    dishDescription: string;
    dishReference: string;
    groupTypeDishType: GroupType = GroupType.All;
    groupTypeNoGroups: GroupType = GroupType.ExcludeGroups;

    selectedIngredient: Ingredient;
    private dishReferenceError: string;
    private dishNameError: string;
    private dishDescriptionError: string;

    tagNameToCreate: string;
    tagTypeToCreate: TagType;

    private dishRatingInfo: DishRatingInfo;
    private ratingsMap = new Map<number, RatingInfo>();

    private errorMessage: string;
    previousDishId: string;
    nextDishId: string;


    constructor(
        private fix: LandingFixService,
        private route: ActivatedRoute,
        private router: Router,
        private title: Title,
        private dishService: DishService,
        private dishContext: DishContext,
        private tagTreeService: TagTreeService,
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
            this.getSurroundingDishIds(id);
        });
    }

    ngOnDestroy() {
        this.unsubscribe.forEach(s => s.unsubscribe());
    }

    getDish(dishId: string) {
        let $sub = this.dishService
            .getDish(dishId)
            .subscribe(p => {
                    this.dish = p;
                    this.isLoading = false;
                    this.harvestTagTypesForDish();
                    this.ingredientTags = this.dish.ingredients;
                    this.ingredientTags.sort((a, b) => {
                        let aNum = parseInt(a.id, 10);
                        let bNum = parseInt(b.id, 10);
                        if (aNum < bNum) return -1;
                        else if (aNum > bNum) return 1;
                        else return 0;
                    });
                    this.dishName = this.dish.name;
                    this.dishReference = this.dish.reference;
                    this.dishDescription = this.dish.description;
                    this.mapRatings(this.dish.ratings);
                    this.determineLiquids(this.dish.ingredients);
                },
                e => this.errorMessage = e);
        this.unsubscribe.push($sub);
    }

    mapRatings(ratingUpdateInfo: RatingUpdateInfo) {
        if (ratingUpdateInfo.dish_ratings != null) {
            this.dishRatingInfo = ratingUpdateInfo.dish_ratings[0];
            this.dishRatingInfo.ratings.forEach(r => {
                r.orig_power = r.power;
                this.ratingsMap.set(r.rating_tag_id, r);
            });
        }
    }

    harvestTagTypesForDish() {
        this.ingredientTags = [];
        this.dishTypeTags = [];
        this.ratingTags = [];
        this.plainOldTags = [];

        for (let tag of this.dish.tags) {
            var tagType = tag.tag_type;
            switch (tagType) {
                case TagType.DishType:
                    this.dishTypeTags.push(tag);
                    break;
                case TagType.Rating:
                    break;
                case TagType.TagType:
                    this.plainOldTags.push(tag);
                    break;
            }
        }
    }

    stringFieldEmpty(testField) {
        if (testField == null) {
            return true
        }
        return testField.trim().length == 0;
    }

    toggleAddIngredient() {
        this.showAddIngredient = !this.showAddIngredient;
        if (this.showAddIngredient) {
            this.showPlainTag = false;
            this.showAddDishType = false;
            this.editId = "0";
        }
    }

    toggleEditMainInfo() {
        this.showEditMainInfo = !this.showEditMainInfo;
        if (this.showEditMainInfo) {
            this.showAddIngredient = false;
            this.showPlainTag = false;
            this.showAddDishType = false;
            this.editId = "0";
        }
    }

    toggleShowAddDishTypeTag() {
        this.showAddDishType = !this.showAddDishType;
        if (this.showAddDishType) {
            this.showEditMainInfo = false;
            this.showPlainTag = false;
            this.showAddIngredient = false;
        }
    }

    toggleShowPlainTag() {
        this.showPlainTag = !this.showPlainTag;
        if (this.showPlainTag) {
            this.showEditMainInfo = false;
            this.showAddIngredient = false;
            this.showAddDishType = false;
        }
    }

    showEditIngredient(ingredient: Ingredient) {
        this.editedIngredient.next(ingredient);
        this.editId = ingredient.tag_id;
        this.selectedIngredient = ingredient;
        this.showAddIngredient = false;
    }

    addTagToDishById(tagId: string) {
        this.addTagModel.hide();
        // add tag to list as item in back end
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

    addTagToDish(tag: Tag) {
        // add tag to list as item in back end
        this.logger.debug("adding tag [" + tag.tag_id + "] to dish");

        let $sub = this.dishService
            .addTagToDish(this.dish.dish_id, tag.tag_id)
            .subscribe(p => {
                this.getDish(this.dish.dish_id);
            });
        this.unsubscribe.push($sub);

        this.showAddIngredient = false;
        this.showPlainTag = false
        this.showAddDishType = false
    }

    createTag(tag: Tag) {
        this.tagNameToCreate = tag.name;
        this.tagTypeToCreate = tag.tag_type;
        this.addTagModel.show();
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

    removeIngredientFromDish(ingredient: Ingredient) {
        // remove ingredient from dish
        this.logger.debug("removing ingredient [" + ingredient.tag_id + "] from dish");

        let $sub = this.dishService
            .removeIngredientFromDish(this.dish.dish_id, ingredient.id)
            .subscribe(p => {
                this.getDish(this.dish.dish_id);
            });
        this.unsubscribe.push($sub);


    }

    changeTheRating(ratingInfo: RatingInfo) {
        if (ratingInfo) {
            this.logger.debug("the rating is still raging: " + ratingInfo.power);
            this.logger.debug("but this time with a tag" + ratingInfo.rating_tag_id);

            if (ratingInfo.orig_power < ratingInfo.power) {
                this.logger.debug("going up");
            } else if (ratingInfo.orig_power > ratingInfo.power) {
                this.logger.debug("going down");

            } else {
                this.logger.debug("no change.");

            }

            this.dishService.setDishRating(this.dish.dish_id, ratingInfo.rating_tag_id, ratingInfo.power).subscribe();
            ratingInfo.orig_power = ratingInfo.power;
        }

    }

    saveAllEdits() {
        this.validateEntry();
        if (this.hasErrors()) {
            return;
        }
        this.showEditMainInfo = false;
        this.dishService.saveDishChanges(this.dish, this.dishDescription, this.dishReference, this.dishName)
            .subscribe(x => {
                    this.getDish(this.dish.dish_id);
                }
            )
    }

    validateEntry() {
        this.dishReferenceError = null;
        this.dishDescriptionError = null;
        this.dishNameError = null;

        if (this.dishName == null || (this.dishName.trim()) == "") {
            this.logger.debug("Invalid - no name for the dish");
            this.dishNameError = "Disn name is required.";
        } else if (this.dishName != null && this.dishName.length > 255) {
            this.logger.debug("Invalid - dish name too long");
            this.dishNameError = "This dish name is too long";
        }
        if (this.dishDescription != null && this.dishDescription.length > 255) {
            this.logger.debug("Invalid - dish description is too long");
            this.dishDescriptionError = "This dish description is too long";
        }
        if (this.dishReference != null && this.dishReference.length > 255) {
            this.logger.debug("Invalid - dish reference is too long");
            this.dishReferenceError = "The dish reference is too long";
        }

    }

    private getSurroundingDishIds(id: string) {
        this.previousDishId = this.dishContext.getPreviousDishId(id);
        this.nextDishId = this.dishContext.getNextDishId(id);

    }

    private hasErrors() {
        return this.dishNameError != null ||
            this.dishDescriptionError != null ||
            this.dishReferenceError != null;
    }


    private determineLiquids(ingredients: IIngredient[]) {
        // loop through ingredients, setting is liquid
        for (let ingredient of ingredients) {
            let tag = this.tagTreeService.retrieveTag(ingredient.tag_id);
            ingredient.is_liquid = tag.is_liquid;
        }
    }

    saveIngredientChanges(ingredient: Ingredient) {
        console.log("ingredient is:" + ingredient);

        let $sub = this.dishService
            .updateIngredient(this.dish.dish_id, ingredient)
            .subscribe(p => {
                this.getDish(this.dish.dish_id);  //MM swap out later for get ingredients
                this.editId = "0";
            });
        this.unsubscribe.push($sub);
    }

    cancelIngredientEdit($event) {
        this.getDish(this.dish.dish_id);  //MM swap out later for get ingredients
        this.editId = "0";
    }

    cancelIngredientAdd($event) {
        this.getDish(this.dish.dish_id);  //MM swap out later for get ingredients
        this.editId = "0";
        this.showAddIngredient = false;
    }


    ingredientDisplay(ingredient: Ingredient) {
        if (ingredient.raw_entry && ingredient.raw_entry.trim().length > 0) {
            return ingredient.raw_entry + " " + ingredient.tag_display;
        }
        return ingredient.tag_display;
    }

    isCurrentEdit(ingredient: Ingredient) {
        if (this.editId == "0") {
            return false;
        }
        if (ingredient.original_tag_id && ingredient.original_tag_id.trim().length > 0) {
            return this.editId == ingredient.original_tag_id;
        }
        return this.editId == ingredient.tag_id;
    }

    addNewIngredient(ingredient: Ingredient) {
        console.log("adding a new ingredient");
        // check for duplicate
        let $sub = this.dishService
            .addIngredient(this.dish.dish_id, ingredient)
            .subscribe(p => {
                this.getDish(this.dish.dish_id);  //MM swap out later for get ingredients
                this.editId = "0";
            });
        this.unsubscribe.push($sub);
        this.showAddIngredient = false;
    }
}
