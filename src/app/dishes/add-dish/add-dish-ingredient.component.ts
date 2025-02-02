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
import {IIngredient, Ingredient} from "../../model/Ingredient";
import {TagTreeService} from "../../shared/services/tag-tree.service";


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
    ingredientTags: Ingredient[] = [];

    showAddIngredient: boolean = true;
    selectedIngredient: Ingredient = null;
    editId = "0";


    showPlainTag: boolean = false;
    showAddDishType: boolean = false;

    dishName: string ;
    dishDescription : string;
    dishReference : string;

    private errorMessage: string;
     tagNameToCreate: string;
     tagTypeToCreate: TagType;

    constructor(
        private fix: LandingFixService,
        private route: ActivatedRoute,
        private router: Router,
        private title: Title,
        private meta: Meta,
        private dishService: DishService,
        private tagTreeService: TagTreeService,
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

    addNewIngredient(ingredient: Ingredient) {
        console.log("adding a new ingredient");
        // check for duplicate
        let $sub = this.dishService
            .addIngredient(this.dish.dish_id, ingredient)
            .subscribe(p => {
                this.getDish(this.dish.dish_id);  //MM swap out later for get ingredients
                this.editId = "0";
                this.selectedIngredient = new Ingredient();
            });
        this.unsubscribe.push($sub);

    }

    getDish(dishId: string) {
        let $sub = this.dishService
            .getDish(dishId)
            .subscribe(p => {
                    this.dish = p;
                    this.isLoading = false;
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
                    this.determineLiquids(this.dish.ingredients);
                },
                e => this.errorMessage = e);
        this.unsubscribe.push($sub);
    }

    private determineLiquids(ingredients: IIngredient[]) {
        // loop through ingredients, setting is liquid
        for (let ingredient of ingredients) {
            let tag = this.tagTreeService.retrieveTag(ingredient.tag_id);
            ingredient.is_liquid = tag.is_liquid;
        }
    }

    toggleAddIngredient() {
        this.showAddIngredient = !this.showAddIngredient;
        if (this.showAddIngredient) {
            this.showPlainTag = false;
            this.showAddDishType = false;
        }
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

    isCurrentEdit(ingredient: Ingredient) {
        if (this.editId == "0") {
            return false;
        }
        if (ingredient.original_tag_id && ingredient.original_tag_id.trim().length > 0) {
            return this.editId == ingredient.original_tag_id;
        }
        return this.editId == ingredient.tag_id;
    }

    ingredientDisplay(ingredient: Ingredient) {
        if (ingredient.raw_entry && ingredient.raw_entry.trim().length > 0) {
            return ingredient.raw_entry + " " + ingredient.tag_display;
        }
        return ingredient.tag_display;
    }


    showEditIngredient(ingredient: Ingredient) {
        this.editId = ingredient.tag_id;
        this.selectedIngredient = ingredient;
        this.showAddIngredient = false;
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
}
