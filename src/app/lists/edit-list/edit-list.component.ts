import {Component, OnDestroy, OnInit} from '@angular/core';
import {Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {LandingFixService} from "../../shared/services/landing-fix.service";
import {ListService} from "../../shared/services/list.service";
import {IShoppingList} from "../../model/shoppinglist";
import {Subscription} from "rxjs";
import {LegendService} from "../../shared/services/legend.service";
import {LegendPoint} from "../../model/legend-point";
import {Category, ICategory} from "../../model/category";

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = [];

  private crossedOffExist: boolean;
  private crossedOffHidden: boolean;
  private shoppingList: IShoppingList;
  private showMakeStarter: boolean;
  private canShowLegend: boolean;
  listLegendMap: Map<string, LegendPoint>;
  legendList: LegendPoint[] = [];
  private highlightSourceId: string;
  private showPantryItems: boolean;

  constructor(
      private fix: LandingFixService,
      private route: ActivatedRoute,
      private title: Title,
      private meta: Meta,
      private listService: ListService,
      public legendService: LegendService,
  ) { }

  ngOnInit() {

    this.title.setTitle( this.route.snapshot.data['title']);
    this.route.params.subscribe(params => {
      let id = params['id'];
      console.log('getting list with id: ', id);
      this.getShoppingList(id);
    });
  }

  ngOnDestroy() {
    //this.fix.removeFixBlog();
    this.unsubscribe.forEach(s => s.unsubscribe())
  }



  getShoppingList(id: string) {
    let $sub = this.listService
        .getById(id)
        .subscribe(p => {
          this.processRetrievedShoppingList(p);
        });
    this.unsubscribe.push($sub);
  }



  private processRetrievedShoppingList(p: IShoppingList) {
    this.determineCrossedOff(p);
    this.prepareLegend(p);
    this.shoppingList = this.filterForDisplay(p);
    this.showMakeStarter = !this.shoppingList.is_starter;
    this.canShowLegend = this.newEvaluateShowLegend();

    // check for starter and pantry
    /* MM
           if (this.shoppingList.is_starter && this.showPantryItems) {
         this.showPantryItems = false;
         this.getShoppingList(this.shoppingListId);
       }
   */
    /*
            // sort legend points by display
      unsortedLegendPoints.sort((a,b) => {
        return (a.display < b.display) ? -1 : 1;
      });
     */

  }


  private determineCrossedOff(shoppingList: IShoppingList) {
    let crossedOff = ListService.getCrossedOff(shoppingList);
    this.crossedOffExist = crossedOff.length > 0;
  }

  private prepareLegend(list: IShoppingList) {
    let legendMap = this.legendService.processLegend(list.legend);
    var collectedValue: LegendPoint[] = [];
    this.listLegendMap = new Map();
    legendMap.forEach((value: LegendPoint, key: string) => {
      collectedValue.push(value);
      this.listLegendMap.set(key,value);
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
      category.items = categoryItems;
      newCategories.push(category);
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
}
