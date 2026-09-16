import {IItemSource} from "./item-source";
import {LegacyCategory} from "./legacyCategory";
import {ILegacyLegendSource} from "./legacy-legend-source";
import {ILegendSource} from "./legend-source";
import {Category} from "./category";

export interface IShoppingList {
  list_id: string;
  created: number;
  updated: number;
  item_count: number;
  legend: ILegendSource[];
  categories: Category[];
  user_id: string;
  is_starter: boolean;
  name: string;
}

export class ShoppingList implements IShoppingList {
  constructor() {
  }
  list_id: string;
  created: number;
  updated: number;
  item_count: number;
  legend: ILegendSource[];
  categories: Category[];
  user_id: string;
  is_starter: boolean;
  name: string;
}

