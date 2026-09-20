import {INestedTag, ITag} from "./tag";
import {IRatingUpdateInfo} from "./rating-update-info";
import {IIngredient} from "./Ingredient";
import {IDishRatingInfo} from "./dish-rating-info";

export interface IDish {
    dish_id: string;
    name: string;
    user_id: string;
    description: string;
    last_added: number;
    reference: string;


    tags: INestedTag[];
    ingredients: IIngredient[];
    ratings: IDishRatingInfo[];
}

export interface IUpdateDish {
    dish_id: string;
    name: string;
    description: string;
    reference: string;
}

export interface IDishList {
    dish_list: IDish[];
}


export class Dish implements IDish {

    constructor() {
    }


    dish_id: string;
    name: string;
    description: string;
    reference: string;
    last_added: number;
    user_id: string;
    tags: INestedTag[];
    ingredients: IIngredient[];
    ratings: IDishRatingInfo[];
}

export class UpdateDish implements IUpdateDish {

    constructor() {
    }


    dish_id: string;
    name: string;
    description: string;
    reference: string;
}

export class DishList implements IDishList {
    dish_list: Dish[];
}
