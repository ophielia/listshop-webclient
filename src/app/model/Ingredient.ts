import {INestedTag, ITag, NestedTag} from "./tag";
import {Amount, IAmount} from "./Amount";
import {ILegacyIngredient} from "./LegacyIngredient";

export interface IIngredient {
  item_id: string;
  display: string;
  tag: INestedTag;
  amount: IAmount;
  is_liquid: boolean;

  raw_entry: string;
  original_tag_id: string;
  raw_modifiers
}


export class Ingredient implements IIngredient {
  constructor() {
  }

  item_id: string;
  display: string;
  tag: INestedTag;
  amount: IAmount;
  is_liquid: boolean;

  raw_entry: string;
  original_tag_id: string;
  raw_modifiers

  static clone(ingredient: IIngredient) {
    var newIngredient = new Ingredient();
    newIngredient.item_id = ingredient.item_id;
    var tag = new NestedTag()
    tag.tag_id = ingredient.tag.tag_id;
    tag.name = ingredient.tag.name;
    newIngredient.tag = tag;
    var amount = new Amount();


    amount.whole_quantity = ingredient.amount.whole_quantity;
    amount.fractional_quantity = ingredient.amount.fractional_quantity;
    amount.quantity_display = ingredient.amount.quantity_display;
    amount.unit_id = ingredient.amount.unit_id;
    amount.modifiers = ingredient.amount.modifiers;
    amount.unit_display = ingredient.amount.unit_display;
    amount.display = ingredient.amount.display;
    newIngredient.amount = amount;

    //MM missing, incomplete, otherwise problematic
//    newIngredient.tag_display = ingredient.tag_display;
//    amount.unit_name = ingredient.amount.unit_name;
//    amount.is_liquid = ingredient.is_liquid;
    return newIngredient;
  }


}


