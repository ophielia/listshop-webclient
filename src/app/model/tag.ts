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

export interface ITagList {
  tag_list: Tag[]
}

export class TagList implements ITagList {
  constructor() {
  }

  tag_list: Tag[] = []
}
