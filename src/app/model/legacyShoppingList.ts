import {IItemSource} from "./item-source";
import {LegacyCategory} from "./legacyCategory";
import {ILegacyLegendSource} from "./legacy-legend-source";

export interface ILegacyShoppingList {
  is_starter: boolean;
  list_id: string;
  categories: LegacyCategory[];
  user_id: string;
  created: number;
  updated: number;
  list_type: string;
  item_count: number;
  name: string;
  legend: ILegacyLegendSource[];
}

export class LegacyShoppingList implements ILegacyShoppingList {
  constructor() {
  }
  is_starter: boolean;
  list_id: string;
  categories: LegacyCategory[];
  user_id: string;
  created: number;
  updated: number;
  list_type: string;
  item_count: number;
  name: string;
  legend: ILegacyLegendSource[];
}

