import {ITag} from "./tag";
import {IRatingInfo} from "./rating-info";
import {IRatingUpdateInfo} from "./rating-update-info";
import {ILegacyIngredient} from "./LegacyIngredient";
export interface ILegacyDish {
  dish_id: string;
  name: string;
  description: string;
  reference: string;
  last_added: number;
  user_id: string;
  tags: ITag[];
  ingredients: ILegacyIngredient[];
  ratings: IRatingUpdateInfo;
}


export class LegacyDish implements ILegacyDish {

  constructor() {
  }


  dish_id: string;
  name: string;
  description: string;
  reference: string;
  last_added: number;
  user_id: string;
  tags: ITag[];
  ingredients: ILegacyIngredient[];
  ratings: IRatingUpdateInfo;
}
