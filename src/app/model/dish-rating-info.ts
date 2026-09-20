import {IRatingInfo} from "./rating-info";
import {INestedTag} from "./tag";

export interface IDishRatingInfo {
  tag: INestedTag;
  power: number;
  max_power: number;
  original_power: number;
}

export class DishRatingInfo implements IDishRatingInfo {
  constructor() {
  }

  tag: INestedTag;
  power: number;
  max_power: number;
  original_power: number;
}

