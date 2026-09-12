import {IRatingInfo} from "./rating-info";

export interface ILegacyDishRatingInfo {
  dish_id: number;
  dish_name: string;
  ratings: IRatingInfo[];
}

export class LegacyDishRatingInfo implements ILegacyDishRatingInfo {
  constructor() {
  }

  dish_id: number;
  dish_name: string;
  ratings: IRatingInfo[];
}

