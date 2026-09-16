import {ILegacyItem, LegacyItem} from "./legacyItem";

export interface ILegacyCategory {
  override_class: string;
  name: string;
  items: LegacyItem[];
  subcategories: ILegacyCategory[];
  has_selected: boolean,
  is_frequent: boolean;
  is_highlighted: boolean;
  dish_id: string;

  allItems(): ILegacyItem[]
}


export class LegacyCategory implements ILegacyCategory {
  constructor(
      public name: string,
      public items: LegacyItem[],
      public subcategories: LegacyCategory[],
      public has_selected: boolean,
      public override_class: string,
      public is_frequent: boolean,
      public is_highlighted: boolean,
  ) {}

  dish_id: string;

  allItems(): ILegacyItem[] {
    var allitems = [];
    allitems = allitems.concat(this.items);
    for (let cat of this.subcategories) {
      allitems = allitems.concat(cat.allItems());
    }
    return allitems;
  }
}

