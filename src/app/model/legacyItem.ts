import {ITag} from "./tag";

export interface ILegacyItem {
  list_id: string;
  item_id: string;
  source_keys: string[];
  added: number;
  free_text: string;
  crossed_off: boolean;
  crossed_off_ts: number;
  tag_id: string;
  used_count: number;
  is_selected: boolean;
  tag: ITag;
}

export class LegacyItem implements ILegacyItem {
  constructor() {
  }

  list_id: string;
  item_id: string;
  source_keys: string[];
  added: number;
  free_text: string;
  crossed_off: boolean;
  crossed_off_ts: number;
  tag_id: string;
  used_count: number;
  is_selected: boolean;
  tag: ITag;
}
