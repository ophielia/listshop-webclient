import {IItem, Item} from "./item";

export interface ICategory {
  name: string;
  category_id: string;
  display_order: number;
  items: IItem[];
}


export class Category implements ICategory {
  constructor () {}

  name: string;
  category_id: string;
  display_order: number;
  items: Item[];

}

