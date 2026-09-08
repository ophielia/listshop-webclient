import {LegacyDish} from "./legacyDish";
import {ITag} from "./tag";

export interface ISlot {
  slot_id: string;
  dish: LegacyDish;
}


export class Slot implements ISlot {
  constructor() {
  }

  slot_id: string;
  dish: LegacyDish;

}
