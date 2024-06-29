import { Component, OnInit } from '@angular/core';
import {EditIngredientInlineComponent} from "../edit-ingredient-inline/edit-ingredient-inline.component";
import {FoodService} from "../../shared/services/food.service";
import {NGXLogger} from "ngx-logger";
import {Ingredient} from "../../model/Ingredient";
import {TagTreeService} from "../../shared/services/tag-tree.service";

@Component({
  selector: 'app-add-ingredient-inline',
  templateUrl: './add-ingredient-inline.component.html',
  styleUrls: ['./add-ingredient-inline.component.scss']
})
export class AddIngredientInlineComponent extends EditIngredientInlineComponent {

  constructor(
       foodService: FoodService,
       logger: NGXLogger,
        tagTreeService: TagTreeService
  ) {
    super(foodService, logger, tagTreeService);
    this.isEditAmount.next(false);
    this.ingredient = new Ingredient();
    this.debugTokens = false;
  }

  ngOnInit(): void {
  }

}
