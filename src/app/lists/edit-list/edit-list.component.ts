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
import {IDish} from "../../model/dish";
import {DishService} from "../../shared/services/dish.service";

@Component({
    selector: 'app-edit-list',
    templateUrl: './edit-list.component.html',
    styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit, OnDestroy {
    private unsubscribe: Subscription[] = [];

    private crossedOffExist: boolean;
    private crossedOffHidden: boolean;
    private showMakeStarter: boolean;
    listLegendMap: Map<string, LegendPoint>;
    legendList: LegendPoint[] = [];
    showActions: boolean = true;
    showAddDish: boolean = false;
    showAddItem: boolean = false;
    showAddList: boolean = false;
    allDishes: IDish[];
    errorMessage: any;
    private highlightSourceId: string;
    private showPantryItems: boolean;
    private showItemLegends: boolean;

    shoppingList: ShoppingList;
    removedItems: IItem[] = [];


    constructor(
        private fix: LandingFixService,
        private route: ActivatedRoute,
        private title: Title,
        private meta: Meta,
        private listService: ListService,
        private dishService: DishService,
        public legendService: LegendService,
        private logger: NGXLogger,
    ) {
    }

    ngOnInit() {

        this.title.setTitle(this.route.snapshot.data['title']);
        this.route.params.subscribe(params => {
            let id = params['id'];
            this.logger.debug('getting list with id: ', id);
            this.getShoppingList(id);
        });
        this.getAllDishes();
    }

    ngOnDestroy() {
        //this.fix.removeFixBlog();
        this.unsubscribe.forEach(s => s.unsubscribe())
    }

    toggleShowActions() {
        this.showActions = !this.showActions;
        if (this.showActions) {
            // start with all inputs hidden
            this.hideAllAddInputs();
        }
    }

    toggleAddList() {
        // hide other inputs
        if (!this.showAddList) {
            // start with all inputs hidden
            this.hideAllAddInputs();
        }
        this.showAddList = !this.showAddList;
    }

    toggleAddDish() {
        // hide other inputs
        if (!this.showAddDish) {
            // start with all inputs hidden
            this.hideAllAddInputs();
        }
        this.showAddDish = !this.showAddDish;
    }

    toggleAddItem() {
        // hide other inputs
        if (!this.showAddItem) {
            // start with all inputs hidden
            this.hideAllAddInputs();
        }
        this.showAddItem = !this.showAddItem;
    }


    getShoppingList(id: string) {
        let $sub = this.listService
            .getById(id)
            .subscribe(p => {
                this.processRetrievedShoppingList(p);
            });
        this.unsubscribe.push($sub);
    }

    removeTagFromList(item: Item) {

        let $sub = this.listService.removeItemFromShoppingList(this.shoppingList.list_id, item.item_id,
            item.tag.tag_id)
            .subscribe(() => {
                this.getShoppingList(this.shoppingList.list_id);
                this.markItemRemoved(item);
            });
        this.unsubscribe.push($sub);
    }

    toggleItemCrossedOff(item: Item) {
        let $sub = this.listService.setItemCrossedOff(this.shoppingList.list_id, item.item_id,
            !item.crossed_off)
            .subscribe(() => {
                this.getShoppingList(this.shoppingList.list_id);
            });
        this.unsubscribe.push($sub);

    }


    markItemRemoved(item: IItem) {
        this.removedItems.push(item);
    }

    showLegends(item: Item) {
        if (!this.showItemLegends) {
            return false;
        }
        return item.source_keys && item.source_keys.length > 0;
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

    highlightSource(source: string) {
        this.hideAllAddInputs();
        if (!source) {
            return;
        }
        var requiresFetchedList = false;
        if (source == this.highlightSourceId) {
            this.highlightSourceId = null;
            requiresFetchedList = true;
        } else {
            this.highlightSourceId = source;
        }

        if (requiresFetchedList) {
            this.getShoppingList(this.shoppingList.list_id);
        } else {
            this.shoppingList = this.filterForDisplay(this.shoppingList);
        }
    }

    addTagToList(tag: Tag) {
        // add tag to list as item in back end
        this.logger.debug("adding tag [" + tag.tag_id + "] to list");
        let promise = this.listService.addTagItemToShoppingList(this.shoppingList.list_id, tag);

        promise.then((data) => {
            this.getShoppingList(this.shoppingList.list_id);
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

    getAllDishes() {
        this.dishService.getAllDishes()
            .subscribe(p => {
                    this.allDishes = p;
                },
                e => this.errorMessage = e);

    }

    addDishToList(dish: any) {
        this.listLegendMap = null;
        let $sub = this.listService.addDishToShoppingList(this.shoppingList.list_id, dish.dish_id)
            .subscribe(() => {
                this.highlightSourceId = this.shoppingList.is_starter ? null : "d" + dish.dish_id;
                this.getShoppingList(this.shoppingList.list_id);
                this.showAddDish = false;
            });
        this.unsubscribe.push($sub);
    }

    addListToList(fromList: IShoppingList) {
        this.listLegendMap = null;
        let promise = this.listService.addListToShoppingList(this.shoppingList.list_id, fromList.list_id);
        promise.then(data => {
            this.highlightSourceId = "l" + fromList.list_id;
            this.getShoppingList(this.shoppingList.list_id);
        })
    }

    removeDishOrList(sourcekey: string) {
        this.hideAllAddInputs();
        let promise = this.listService.removeItemsByDishOrList(this.shoppingList.list_id, sourcekey)
        promise.then(data => {
            this.getShoppingList(this.shoppingList.list_id);
        });

        if (this.highlightSourceId == sourcekey) {
            this.highlightSourceId = null;
        }
    }


    private processRetrievedShoppingList(p: IShoppingList) {
        this.determineCrossedOffPresent(p);
        this.prepareLegend(p);
        this.shoppingList = this.filterForDisplay(p);
        this.showMakeStarter = !this.shoppingList.is_starter;
        this.showItemLegends = this.newEvaluateShowLegend();
    }


    private determineCrossedOffPresent(shoppingList: IShoppingList) {
        let crossedOff = ListService.getCrossedOff(shoppingList);
        this.crossedOffExist = crossedOff.length > 0;
    }

    private prepareLegend(list: IShoppingList) {

        let legendMap = this.legendService.processLegend(list.legend);
        var collectedValue: LegendPoint[] = [];
        this.listLegendMap = new Map();
        legendMap.forEach((value: LegendPoint, key: string) => {
            collectedValue.push(value);
            this.listLegendMap.set(key, value);
        });
        collectedValue.sort((a, b) => {
            return a.display.toLowerCase().localeCompare(b.display.toLowerCase());
        });
        this.legendList = collectedValue;

    }

    private filterForDisplay(shoppingList: IShoppingList): IShoppingList {

        if (this.crossedOffHidden) {
            for (let category of shoppingList.categories) {
                this.hideCrossedOff(category);
            }
        }
        if (this.highlightSourceId || (this.showPantryItems && this.showMakeStarter)) {
            shoppingList.categories = this.pullCategoryByTag(this.highlightSourceId, shoppingList);
        }
        return shoppingList;
    }

    private hideCrossedOff(category: ICategory) {
        // process subcategories
        for (let subcategory of category.subcategories) {
            this.hideCrossedOff(subcategory);
        }
        // process direct items
        category.items = category.items.filter(i => !i.crossed_off);
    }

    private pullCategoryByTag(sourceId: string, shoppingList: IShoppingList) {
        if (!sourceId && !this.showPantryItems) {
            return;
        }
        var highlightId = sourceId ? sourceId : LegendService.FREQUENT;

        var newCategories = [];
        var pulledItems = [];
        for (let category of shoppingList.categories) {
            var categoryItems = [];
            for (let item of category.items) {
                if (item.source_keys.includes(highlightId)) {
                    pulledItems.push(item);
                } else {
                    categoryItems.push(item);
                }
            }
            if (categoryItems.length > 0) {
                category.items = categoryItems;
                newCategories.push(category);
            }
        }
        // now, make new category
        var name;
        var is_frequent = false;
        if (highlightId == LegendService.FREQUENT) {
            name = "Frequent";
            is_frequent = true;
        } else {
            var legendPoint = this.listLegendMap.get(this.highlightSourceId);
            name = legendPoint.display;

        }
        // to fill in name, items, is_frequent
        var pulledCategory = new Category(
            name,
            pulledItems,
            null,
            "yes",
            is_frequent
        )

        // put pulledItems at the front of the list
        newCategories.unshift(pulledCategory);
        return newCategories;
    }

    private newEvaluateShowLegend() {
        let thisListIsTheStarter = this.shoppingList.is_starter;
        if (thisListIsTheStarter) {
            return false;
        }
        return this.shoppingList.legend.length > 0;
    }


    private hideAllAddInputs() {
        this.showAddItem = false;
        this.showAddDish = false;
        this.showAddList = false;
    }


}
