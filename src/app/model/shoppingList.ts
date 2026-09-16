import {ILegendSource} from "./legend-source";
import {Category} from "./category";

export interface IShoppingList {
    list_id: string;
    created: number;
    updated: number;
    item_count: number;
    legend: ILegendSource[];
    categories: Category[];
    user_id: string;
    is_starter: boolean;
    name: string;
}

export class ShoppingList implements IShoppingList {
    constructor() {
    }

    list_id: string;
    created: number;
    updated: number;
    item_count: number;
    legend: ILegendSource[];
    categories: Category[];
    user_id: string;
    is_starter: boolean;
    name: string;
}

export interface IListOfShoppingLists {
    list_of_lists: INestedShoppingList[];
}

export class ListOfShoppingLists implements IListOfShoppingLists {
    list_of_lists: INestedShoppingList[];
}

export interface INestedShoppingList {
    list_id: string;
    created: number;
    updated: number;
    item_count: number;
    user_id: string;
    is_starter_list: boolean;
    name: string;
}


export class NestedShoppingList implements INestedShoppingList {
    list_id: string;
    created: number;
    updated: number;
    item_count: number;
    user_id: string;
    is_starter_list: boolean;
    name: string;
}
