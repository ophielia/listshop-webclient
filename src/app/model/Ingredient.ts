import {INestedTag, ITag} from "./tag";
import {IAmount} from "./Amount";

export interface IIngredient {
  item_id: string;
  display: string;
  tag: INestedTag;
  amount: IAmount;
}

export class Ingredient implements IIngredient {
  constructor() {
  }

  item_id: string;
  display: string;
  tag: INestedTag;
  amount: IAmount;

}
