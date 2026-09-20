import {INestedTag, ITag} from "./tag";
import {IAmount} from "./Amount";
import {IItemDetails} from "./Itemdetails";

export interface IItem {
  item_id: string;
  tag: INestedTag;
  amount: IAmount;
  added: number;
  removed: number;
  updated: number;
  last_changed: number;
  crossed_off: number;
  list_id: string;
  used_count: number;
  sources: string[];
  amount_type: string;
  details: IItemDetails[];
}

export class Item implements IItem {
  constructor() {
  }
  item_id: string;
  tag: INestedTag;
  amount: IAmount;
  added: number;
  removed: number;
  updated: number;
  last_changed: number;
  crossed_off: number;
  list_id: string;
  used_count: number;
  sources: string[];
  amount_type: string;
  details: IItemDetails[];

  is_selected: boolean;
}




export interface IItemPost {
  tag_id: string;
  amount: IAmount;
  raw_entry: string;
}

export class ItemPost implements IItemPost {
  constructor() {
  }
  tag_id: string;
  amount: IAmount;
  raw_entry: string;
}
