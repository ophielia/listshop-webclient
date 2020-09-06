import {IItemSource} from "./item-source";
import {Category} from "./category";

export interface IShoppingList {
  list_id: string;
  categories: Category[];
  user_id: string;
  created: number;
  updated: number;
  list_type: string;
  layout_type: string;
  item_count: number;
  name: string;
  source_keys: IItemSource[];

}

export class ShoppingList implements IShoppingList {
  constructor() {
  }

  list_id: string;
  categories: Category[];
  user_id: string;
  created: number;
  updated: number;
  list_type: string;
  layout_type: string;
  item_count: number;
  name: string;
  source_keys: IItemSource[];
}

