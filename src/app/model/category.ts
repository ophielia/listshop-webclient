import {IItem, Item} from "./Item";

export interface ICategory {
    name: string;
    category_id: string;
    display_order: number;
    items: IItem[];
}


export class Category implements ICategory {
    constructor(
        name: string,
        category_id: string,
        display_order: number,
        items: Item[],
        has_selected: boolean,
        is_frequent: boolean,
        is_highlighted: boolean
    ) {
        this.name = name;
        this.category_id = category_id;
        this.display_order = display_order;
        this.items = items;
        this.has_selected = has_selected;
        this.is_frequent = is_frequent;
        this.is_highlighted = is_highlighted;
    }

    name: string;
    category_id: string;
    display_order: number;
    items: Item[];

    has_selected: boolean;
    is_frequent: boolean;
    is_highlighted: boolean;
}

