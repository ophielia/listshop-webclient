import {ITag} from "./tag";

export interface IIngredient {
  ingredient_id: string;
  tag_id: string;
  tag_display: string;
  whole_quantity: number;
  fractional_quantity: string;
  quantity_display: string;
  unit_id: string;
  unit_name: string;
  raw_modifiers: string;
  unit_display: string;
  raw_entry: string;
}

export class Ingredient implements IIngredient {
  constructor() {
  }

  ingredient_id: string;
  tag_id: string;
  tag_display: string;
  whole_quantity: number;
  fractional_quantity: string;
  quantity_display: string;
  unit_id: string;
  unit_name: string;
  raw_modifiers: string;
  unit_display: string;
  raw_entry: string;
}
