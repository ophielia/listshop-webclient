import {Component, OnDestroy, OnInit} from '@angular/core';
import {LandingFixService} from "../../shared/services/landing-fix.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Meta, Title} from "@angular/platform-browser";
import {ListService} from "../../shared/services/list.service";
import {Subscription} from "rxjs";
import {ShoppingList} from "../../model/shoppinglist";
import {Dish} from "../../model/dish";
import {DishService} from "../../shared/services/dish.service";
import {ITag} from "../../model/tag";
import {DishSort} from "../../model/dish-sort";
import {SortDirection} from "../../model/sort-direction";
import {SortKey} from "../../model/sort-key";

@Component({
    selector: 'app-manage-dishes',
    templateUrl: './manage-dishes.component.html',
    styleUrls: ['./manage-dishes.component.scss']
})
export class ManageDishesComponent implements OnInit, OnDestroy {
    unsubscribe: Subscription[] = [];
    searchValue: string;

    filteredDishes: Dish[];
    allDishes: Dish[];

    filterTags: ITag[];

    sortOptions: SortKey[] = DishSort.getKeys();
    sortKey: SortKey = SortKey.LastUsed;
    sortDirection: SortDirection = SortDirection.Up;

    private errorMessage: string;

    constructor(
        private fix: LandingFixService,
        private route: ActivatedRoute,
        private router: Router,
        private title: Title,
        private meta: Meta,
        private dishService: DishService,
        private listService: ListService
    ) {
    }

    ngOnInit() {
        // this.fix.addFixBlogDetails();
        this.title.setTitle(this.route.snapshot.data['title']);
        this.getAllDishes();
    }

    ngOnDestroy() {
        this.unsubscribe.forEach(s => s.unsubscribe());
    }


    filterByDishname() {
        console.log("filter by dishname" + this.searchValue);

        if (this.searchValue.length == 0) {
            this.filteredDishes = this.allDishes;
        } else if (this.filteredDishes) {
            let filterBy = this.searchValue.toLocaleLowerCase();
            this.filteredDishes = this.filteredDishes.filter((dish: Dish) =>
                dish.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
        }
    }

    clearSearchValue() {
        this.searchValue = "";
        this.resetFilter();
    }

    resetFilter() {
        this.filteredDishes = this.allDishes;
    }

    getAllDishes() {
        if (!this.filterTags || this.filterTags.length == 0) {
            this.dishService
                .getAllDishes()
                .subscribe(p => {
                        this.sortDishes(p);
                        this.allDishes = p;
                        this.resetFilter()
                    },
                    e => this.errorMessage = e);
        } else {
            var includeTagList = this.filterTags.filter(t => t.is_inverted == false).map(t => t.tag_id);
            var excludeTagList = this.filterTags.filter(t => t.is_inverted == true).map(t => t.tag_id);
            let $sub = this.dishService
                .findByTags(includeTagList, excludeTagList)
                .subscribe(p => {
                        this.sortDishes(p);
                        this.allDishes = p;
                        this.filteredDishes = p;
                    },
                    e => this.errorMessage = e);
            this.unsubscribe.push($sub);
        }
    }

    sortDishes(dishList: Dish[]) {
        if (this.sortKey == SortKey.Name) {
            this.sortByDishName(dishList);
        } else if (this.sortKey == SortKey.LastUsed) {
            this.sortByLastUsed(dishList)
        } else if (this.sortKey == SortKey.CreatedOn) {
            this.sortByCreated(dishList);
        }

    }

    private sortByDishName(dishList: Dish[]) {
        dishList.sort((a, b) => {
            return a.name.localeCompare(b.name) * this.sortDirection;
        });
    }


    private sortByCreated(dishList: Dish[]) {
        dishList.sort((a, b) => {
            let aNum = parseInt(a.dish_id, 10);
            let bNum = parseInt(b.dish_id, 10);

            if (aNum < bNum) return -1 * this.sortDirection;
            else if (aNum > bNum) return 1 * this.sortDirection;
            else return 0;
        });
    }


    private sortByLastUsed(dishList: Dish[]) {
        dishList.sort((a, b) => {
            let aDate = !a.last_added ? new Date('1970-10-01') : new Date(a.last_added);
            let bDate = !b.last_added ? new Date('1970-10-01') : new Date(b.last_added);
            if (aDate < bDate) return -1 * this.sortDirection;
            else if (aDate > bDate) return 1 * this.sortDirection;
            else return 0;
        });
    }

    addTagToFilter(tag: ITag) {
        tag.is_inverted = false;
        if (!this.filterTags) {
            this.filterTags = [];
        }

        this.filterTags.push(tag);

        this.getAllDishes();
    }
}
