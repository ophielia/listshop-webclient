import {ITag} from "./tag";

export interface IAmount {
  quantity: number;
  whole_quantity: number;
  rounded_quantity: number;
  quantity_display: string;
  unit_id: string;
  unit_display: string;
  display: string;
  modifiers: string[];
}

export class Amount implements IAmount {
  constructor() {
  }
  quantity: number;
  whole_quantity: number;
  rounded_quantity: number;
  quantity_display: string;
  unit_id: string;
  unit_display: string;
  display: string;
  modifiers: string[];
}
