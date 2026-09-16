import {IItem, Item} from "./item";

export interface ILegacyCategory {
  override_class: string;
  name: string;
  items: Item[];
  subcategories: ILegacyCategory[];
  has_selected: boolean,
  is_frequent: boolean;
  is_highlighted: boolean;
  dish_id: string;

  allItems(): IItem[]
}


export class LegacyCategory implements ILegacyCategory {
  constructor(
      public name: string,
      public items: Item[],
      public subcategories: LegacyCategory[],
      public has_selected: boolean,
      public override_class: string,
      public is_frequent: boolean,
      public is_highlighted: boolean,
  ) {}

  dish_id: string;

  allItems(): IItem[] {
    var allitems = [];
    allitems = allitems.concat(this.items);
    for (let cat of this.subcategories) {
      allitems = allitems.concat(cat.allItems());
    }
    return allitems;
  }
}

