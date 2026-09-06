export interface ILegacyTag {
  tag_id: string;
  name: string;
  description: string;
  tag_type: string;
  power: number;
  parent_id: string;

  is_inverted: boolean;
  is_group: boolean;
  is_liquid: boolean;
}

export class LegacyTag implements ILegacyTag {
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
  is_liquid: boolean;
}



export interface ITag {
  name: string;
  power: number;
  tag_id: string;
  user_id: string;
  tag_type: string;
  parent_id: string;
  is_group: boolean;

  is_inverted: boolean;
  is_liquid: boolean;
}

export class Tag implements ITag {
  constructor() {
  }

  name: string;
  power: number;
  tag_id: string;
  user_id: string;
  tag_type: string;
  parent_id: string;
  is_group: boolean;

  is_inverted: boolean;
  is_liquid: boolean;
}
