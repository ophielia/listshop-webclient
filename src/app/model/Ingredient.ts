import {INestedTag, ITag, NestedTag} from "./tag";
import {Amount, IAmount} from "./Amount";


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

export interface IPutIngredient {
  id: string;
  tag_id: string;
  tag_display: string;
  raw_entry: string;
  amount: IAmount;


}

export class Ingredient implements IIngredient {
  constructor() {
    this.tag = new NestedTag();
    this.amount = new Amount();
    this.raw_modifiers = [];
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

export class PutIngredient implements IPutIngredient {
  id: string;
  tag_id: string;
  tag_display: string;
  raw_entry: string;
  amount: IAmount;

    static from(ingredient: IIngredient) {
      var newIngredient = new PutIngredient();
      newIngredient.id = ingredient.item_id;
      var tag = new NestedTag()
      newIngredient.tag_id = ingredient.tag.tag_id;
      newIngredient.tag_display = ingredient.tag.name;
      newIngredient.raw_entry = ingredient.raw_entry;
      var amount = Amount.clone(ingredient.amount);
newIngredient.amount = amount;
      return newIngredient;
    }
}


