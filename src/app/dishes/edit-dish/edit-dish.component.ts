import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {LandingFixService} from "../../shared/services/landing-fix.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Meta, Title} from "@angular/platform-browser";
import {Subscription} from "rxjs";
import {IShoppingList} from "../../model/shoppinglist";
import {Dish} from "../../model/dish";
import {DishService} from "../../shared/services/dish.service";
import {ITag, Tag} from "../../model/tag";
import {DishSort} from "../../model/dish-sort";
import {SortDirection} from "../../model/sort-direction";
import {SortKey} from "../../model/sort-key";
import {NGXLogger} from "ngx-logger";
import {GroupType, TagTree} from "../../shared/services/tag-tree.object";
import {GenerateListComponent} from "../../shared/components/generate-list/generate-list.component";
import {ListService} from "../../shared/services/list.service";
import {MealPlanService} from "../../shared/services/meal-plan.service";
import TagType from "../../model/tag-type";


@Component({
    selector: 'app-edit-dish',
    templateUrl: './edit-dish.component.html',
    styleUrls: ['./edit-dish.component.scss']
})
export class EditDishComponent implements OnInit, OnDestroy {
    @ViewChild('dishesaddedtolist') addToListModal;
    @ViewChild('dishesaddedtomealplan') addToMealPlanModal;
    @ViewChild('addtagstodishesmodal') addTagsToDishesModal;

    unsubscribe: Subscription[] = [];
    dish: Dish;
    dishTypeTags: Tag[] = [];
    ingredientTags: Tag[]= [];
    ratingTags: Tag[]= [];
    plainOldTags: Tag[]= [];

    showAddIngredient: boolean = false;

    searchValue: string;
    lastSearchLength: number = 0;

    filteredDishes: Dish[];
    allDishes: Dish[];

    filterTags: ITag[];

    showAddTag: boolean = false;
    showAddToList: boolean = false;
    showAddToMealplan: boolean = false;

    sortOptions: SortKey[] = DishSort.getKeys();
    sortKey: SortKey = SortKey.LastUsed;
    sortDirection: SortDirection = SortDirection.Up;

    hasSelected: boolean = false;
    selectedDishes: Dish[] = [];

    groupType: GroupType = GroupType.All;

    private errorMessage: string;
    isSingleClick: Boolean = true;
    showOrderBy: boolean = false;
    showAddToNewList: boolean;
    isLoading: boolean = true;

    displayId: string;

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
                    this.harvestTagTypesForDish();
                },
                e => this.errorMessage = e);
    }


    harvestTagTypesForDish() {
        this.ingredientTags = [];
        this.dishTypeTags = [];
        this.ratingTags = [];
        this.plainOldTags = [];

        for (let tag of this.dish.tags) {
            var tagType = tag.tag_type;
            switch (tagType) {
                case TagType.Ingredient:
                    this.ingredientTags.push(tag);
                    break;
                case TagType.DishType:
                    this.dishTypeTags.push(tag);
                    break;
                case TagType.Rating:
                    this.ratingTags.push(tag);
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
    }







    filterByDishname() {
        console.log("filter by dishname" + this.searchValue);

        if (this.searchValue.length == 0) {
            this.filteredDishes = this.allDishes;
        } else if (this.filteredDishes && this.lastSearchLength < this.searchValue.length) {
            let filterBy = this.searchValue.toLocaleLowerCase();
            this.filteredDishes = this.filteredDishes.filter((dish: Dish) =>
                dish.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
        } else {
            let filterBy = this.searchValue.toLocaleLowerCase();
            this.filteredDishes = this.allDishes.filter((dish: Dish) =>
                dish.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
        }
        this.lastSearchLength = this.searchValue.length;
    }

    clearSearchValue() {
        this.searchValue = "";
        this.resetFilter();
    }

    resetFilter() {
        this.filteredDishes = this.allDishes;
    }






    toggleShowOrderBy() {
        this.showOrderBy = !this.showOrderBy;
    }

    isSortUp() {
        return this.sortDirection == SortDirection.Up;
    }

    editDish(dishId
                 :
                 String
    ) {
        this.router.navigateByUrl("home");
    }

    selectDish(dish
                   :
                   Dish
    ) {
        var alreadySelected = this.selectedDishes.filter(t => dish.dish_id == t.dish_id);
        if (alreadySelected.length > 0) {
            return;
        }
        this.selectedDishes.push(dish);
        this.hasSelected = this.selectedDishes.length > 0;
    }

    unSelectDish(dishId
                     :
                     string
    ) {
        this.selectedDishes = this.selectedDishes.filter(t => dishId != t.dish_id);
        this.hasSelected = this.selectedDishes.length > 0;
    }

    toggleAddTag() {
        this.showAddTag = !this.showAddTag;

        this.showAddToNewList = false;
        this.showAddToList = false;
        this.showAddToMealplan = false;

    }

    toggleAddToList() {
        this.showAddToList = !this.showAddToList;

        this.showAddTag = false;
        this.showAddToNewList = false;
        this.showAddToMealplan = false;

    }


    toggleAddToMealplan() {
        this.showAddToMealplan = !this.showAddToMealplan;

        this.showAddTag = false;
        this.showAddToList = false;
        this.showAddToNewList = false;

    }


    toggleAddToNewList() {
        this.showAddToNewList = !this.showAddToNewList;

        this.showAddTag = false;
        this.showAddToList = false;
        this.showAddToMealplan = false;
    }



}
