import {ITag, NestedTag} from "./tag";
import {IIngredient} from "./Ingredient";

export interface IAmount {
  quantity: number;
  whole_quantity: number;
  rounded_quantity: number;
  fractional_quantity: string;
  quantity_display: string;
  unit_id: string;
  unit_display: string;
  display: string;
  modifiers: string[];
}

export class Amount implements IAmount {
  constructor() {
    this.quantity = 0;
    this.whole_quantity = 0;
    this.rounded_quantity = 0;
    this.fractional_quantity = "";
    this.quantity_display = "";
    this.unit_id = "";
    this.unit_display = "";
    this.display = "";
    this.modifiers = [];
  }
  quantity: number;
  whole_quantity: number;
  rounded_quantity: number;
  fractional_quantity: string;
  quantity_display: string;
  unit_id: string;
  unit_display: string;
  display: string;
  modifiers: string[];

  static clone(amount: IAmount) {
    var newAmount = new Amount();

    newAmount.quantity = amount.quantity;
    newAmount.whole_quantity = amount.whole_quantity;
    newAmount.rounded_quantity = amount.rounded_quantity;
    newAmount.fractional_quantity = amount.fractional_quantity;
    newAmount.quantity_display = amount.quantity_display;
    newAmount.unit_id = amount.unit_id;
    newAmount.unit_display = amount.unit_display;
    newAmount.display = amount.display;
    newAmount.modifiers = amount.modifiers;


    return newAmount;
  }
}
