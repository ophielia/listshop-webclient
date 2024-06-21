import {ITag} from "./tag";

export interface IIngredient {
  original_tag_id: string;
  id: string;
  tag_id: string;
  tag_display: string;
  whole_quantity: number;
  fractional_quantity: string;
  quantity_display: string;
  unit_id: string;
  unit_name: string;
  raw_modifiers: string[];
  unit_display: string;
  raw_entry: string;
  is_liquid: boolean;
}

export class Ingredient implements IIngredient {
  constructor() {
  }

  id: string;
  tag_id: string;
  original_tag_id: string;
  tag_display: string;
  whole_quantity: number;
  fractional_quantity: string;
  quantity_display: string;
  unit_id: string;
  unit_name: string;
  raw_modifiers: string[];
  unit_display: string;
  raw_entry: string;
  is_liquid: boolean;

  static clone(ingredient: IIngredient) {
    var newIngredient = new Ingredient();
    newIngredient.id = ingredient.id;
    newIngredient.tag_id = ingredient.tag_id;
    newIngredient.tag_display = ingredient.tag_display;
    newIngredient.whole_quantity = ingredient.whole_quantity;
    newIngredient.fractional_quantity = ingredient.fractional_quantity;
    newIngredient.quantity_display = ingredient.quantity_display;
    newIngredient.unit_id = ingredient.unit_id;
    newIngredient.unit_name = ingredient.unit_name;
    newIngredient.raw_modifiers = ingredient.raw_modifiers;
    newIngredient.unit_display = ingredient.unit_display;
    newIngredient.raw_entry = ingredient.raw_entry;
    newIngredient.is_liquid = ingredient.is_liquid;
    return newIngredient;
  }
}
