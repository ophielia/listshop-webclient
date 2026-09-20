import {INestedTag, ITag} from "./tag";
import {IAmount} from "./Amount";

export interface IItemDetails {
  amount: IAmount;
  dish_id: string;
  list_id: string;
  contains_unspecified: boolean;
}

export class ItemDetails implements IItemDetails {
  constructor() {
  }

  amount: IAmount;
  dish_id: string;
  list_id: string;
  contains_unspecified: boolean;
}
