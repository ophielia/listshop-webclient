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

export interface INestedTag {
  name: string;
  tag_id: string;
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

export class NestedTag implements INestedTag {
  constructor() {
  }

  name: string;
  tag_id: string;
}

export interface ITagList {
  tag_list: Tag[]
}

export class TagList implements ITagList {
  constructor() {
  }

  tag_list: Tag[] = []
}
