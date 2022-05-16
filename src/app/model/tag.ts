export interface ITag {
  tag_id: string;
  name: string;
  description: string;
  tag_type: string;
  power: number;
  parent_id: string;

  is_inverted: boolean;
  is_group: boolean;
}

export class Tag implements ITag {
  constructor() {
  }

  tag_id: string;
  name: string;
  description: string;
  tag_type: string;
  power: number;
  parent_id: string;
  is_inverted: boolean;
  is_group: boolean = false;
}
