import {INestedTag, ITag} from "./tag";
import {IAmount} from "./Amount";

export interface IIngredient {
  item_id: string;
  display: string;
  tag: INestedTag;
  amount: IAmount;
  is_liquid: boolean;
}

export interface IAddEditIngredient {
  id: string;
  tagDisplay: string;
  tagId: string;
  rawEntry: string;
  amount: IAmount;



}

export class Ingredient implements IIngredient {
  constructor() {
  }

  item_id: string;
  display: string;
  tag: INestedTag;
  amount: IAmount;
  is_liquid: boolean;
}


export class AddEditIngredient implements IAddEditIngredient {
  id: string;
  tagDisplay: string;
  tagId: string;
  rawEntry: string;
  amount: IAmount;



}
