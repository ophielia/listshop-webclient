import {ITag} from "./tag";
import {IRatingInfo} from "./rating-info";
import {IRatingUpdateInfo} from "./rating-update-info";
import {IIngredient} from "./Ingredient";
export interface IDish {
  dish_id: string;
  name: string;
  description: string;
  reference: string;
  last_added: number;
  user_id: string;
  tags: ITag[];
  ingredients: IIngredient[];
  ratings: IRatingUpdateInfo;
}


export class Dish implements IDish {

  constructor() {
  }


  dish_id: string;
  name: string;
  description: string;
  reference: string;
  last_added: number;
  user_id: string;
  tags: ITag[];
  ingredients: IIngredient[];
  ratings: IRatingUpdateInfo;
}
