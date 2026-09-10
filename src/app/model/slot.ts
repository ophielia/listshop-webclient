import {Dish} from "./dish";
import {ITag} from "./tag";

export interface ISlot {
  slot_id: string;
  dish: Dish;
}


export class Slot implements ISlot {
  constructor() {
  }

  slot_id: string;
  dish: Dish;

}
