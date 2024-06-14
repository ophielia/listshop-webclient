import {User} from "./user";
import {IShoppingList} from "./shoppinglist";
import {Category} from "./category";
import {Item} from "./item";
import {ITag} from "./tag";
import {Dish} from "./dish";
import {ILegendSource, LegendSource} from "./legend-source";
import {MealPlan} from "./mealplan";
import {Slot} from "./slot";
import {RatingUpdateInfo} from "./rating-update-info";
import {IRatingInfo, RatingInfo} from "./rating-info";
import {DishRatingInfo, IDishRatingInfo} from "./dish-rating-info";
import {UserProperty} from "./userproperty";
import {Celebration} from "./celebration";
import {ISuggestion} from "./suggestion";
import {IIngredient} from "./Ingredient";


export default class MappingUtils {

    static showConsoleLogs: boolean = false;

    static toUser(r: any): User {
        return <User>({
            email: r.user.email,
            creation_date: r.user.creation_date,
            user_name: r.user.user_name,
            roles: r.user.roles,
            token: r.user.token

        });
    }

    static toShoppingList(jsonResult: any): IShoppingList {
        let shoppingList = <IShoppingList>({
            list_id: jsonResult.shopping_list.list_id,
            name: jsonResult.shopping_list.name,
            user_id: jsonResult.shopping_list.user_id,
            created: jsonResult.shopping_list.created,
            list_type: jsonResult.shopping_list.list_type,
            item_count: jsonResult.shopping_list.item_count,
            updated: jsonResult.shopping_list.updated,
            is_starter: jsonResult.shopping_list.is_starter_list,
            categories: jsonResult.shopping_list.categories != null ? jsonResult.shopping_list.categories.map(MappingUtils._toCategory) : null,
            legend: jsonResult.shopping_list.legend != null ? jsonResult.shopping_list.legend.map(MappingUtils._toLegend) : []
        });

        if (MappingUtils.showConsoleLogs) {
            console.log('Parsed list:', shoppingList);
        }
        return shoppingList;

    }

    static toSuggestion(jsonResult: any): ISuggestion {
        let suggestion = <ISuggestion>({
            text: jsonResult.text,
            type: jsonResult.modifier_type,
            reference_id: jsonResult.reference_id
        });

        if (MappingUtils.showConsoleLogs) {
            console.log('Parsed list:', suggestion);
        }
        return suggestion;

    }

    static toCelebration(r: any): Celebration {
        return <Celebration>({
            handle: r.handle,
            start_date: r.start_date,
            end_date: r.end_date,
            hostess_greeting_title: r.hostess_title,
            hostess_greeting: r.hostess_text,
            hostess_display: r.hostess_display,
            party_title: r.party_title,
            party_text: r.party_text,
            throw_confetti_count: r.throw_confetti_count,
        })
    }

    static toDish(r: any): Dish {
        let dish = MappingUtils._toDish(r.dish);

        if (MappingUtils.showConsoleLogs) {
            console.log('Parsed dish:', dish);
        }

        return dish;
    }

    static toTag(r: any): ITag {
        return MappingUtils._toTag(r.tag);
    }

    static toMealPlan(r: any): MealPlan {
        let mealPlan = <MealPlan>({
                meal_plan_id: r.meal_plan.meal_plan_id,
                user_id: r.meal_plan.user_id,
                name: r.meal_plan.name,
                created: r.meal_plan.created,
                meal_plan_type: r.meal_plan.meal_plan_type,
                slots: r.meal_plan.slots.map(MappingUtils._toSlot)
            })
        ;

        if (MappingUtils.showConsoleLogs) {
            console.log('Parsed mealplan:', mealPlan);
        }

        return mealPlan;
    }


    static toUserProperty(r: any): UserProperty {
        let userProperty = <UserProperty>({
                key: r.key,
                value: r.value
            })
        ;


        return userProperty;
    }

    static toRatingUpdateInfo(r: any): RatingUpdateInfo {
        if (!r || r == null) {
            return new RatingUpdateInfo();
        }
        let ratingInfo = MappingUtils._toRatingUpdateInfo(r);

        if (MappingUtils.showConsoleLogs) {
            console.log('Parsed rating info:', ratingInfo);
        }

        return ratingInfo;
    }

    private static _toRatingUpdateInfo(r: any): RatingUpdateInfo {

        return <RatingUpdateInfo>({
            headers: r.headers.map(MappingUtils._toRatingInfo),
            dish_ratings: r.dish_ratings.map(MappingUtils._toDishRatingInfo)
        });
    }

    static _toRatingInfo(r: any): IRatingInfo {
        let ratingInfo = <RatingInfo>({
            rating_tag_id: r.rating_tag_id,
            label: r.label,
            power: r.power,
            max_power: r.max_power
        });

        if (MappingUtils.showConsoleLogs) {
            console.log('Parsed rating info:', ratingInfo);
        }
        return ratingInfo;
    }

    static _toDishRatingInfo(r: any): IDishRatingInfo {
        let dishRatingInfo = <DishRatingInfo>({
            dish_id: r.dish_id,
            dish_name: r.dish_name,
            ratings: r.ratings.map(MappingUtils._toRatingInfo)
        });
        if (MappingUtils.showConsoleLogs) {
            console.log('Parsed dish rating info:', dishRatingInfo);
        }
        return dishRatingInfo;
    }

    private static _toCategory(jsonResult: any): Category {
        let category = <Category>({
            name: jsonResult.name,
            items: jsonResult.items.map(MappingUtils._toItem),
            //category_type: jsonResult.category_type,
            subcategories: jsonResult.subcategories ? jsonResult.subcategories.map(MappingUtils._toCategory) : null

        });

        if (MappingUtils.showConsoleLogs) {
            console.log('Parsed category:', category);

        }

        return category;
    }

    private static _toItem(jsonResult: any): Item {
        let item = <Item>({
            list_id: jsonResult.list_id,
            item_id: jsonResult.item_id,
            source_keys: jsonResult.source_keys,
            added: jsonResult.added,
            tag_id: jsonResult.tag_id,
            used_count: jsonResult.used_count,
            free_text: jsonResult.free_text,
            crossed_off_ts: jsonResult.crossed_off,
            crossed_off: (jsonResult.crossed_off != null),
            is_selected: false,
            tag: MappingUtils._toTag(jsonResult.tag)
        });

        if (MappingUtils.showConsoleLogs) {
            console.log('Parsed tag:', item);

        }
        return item;
    }

    private static _toTag(jsonResult: any): ITag {
        return <ITag>({
            tag_id: jsonResult.tag_id,
            user_id: jsonResult.user_id,
            description: jsonResult.description,
            is_inverted: false,
            is_group: jsonResult.is_group,
            name: jsonResult.name,
            parent_id: jsonResult.parent_id,
            power: jsonResult.power,
            tag_type: jsonResult.tag_type,
            is_expanded: false,
        })
    }

    private static _toIngredients(jsonResult: any): IIngredient {
        return <IIngredient>({
            ingredient_id: jsonResult.ingredient_id,
            tag_id: jsonResult.tag_id,
            tag_display: jsonResult.tag_display,
            whole_quantity: jsonResult.whole_quantity,
            fractional_quantity: jsonResult.fractional_quantity,
            quantity_display: jsonResult.quantity_display,
            unit_id: jsonResult.unit_id,
            unit_name: jsonResult.unit_name,
            raw_modifiers: jsonResult.raw_modifiers,
            unit_display: jsonResult.unit_display,
            raw_entry: jsonResult.raw_entry
        })
    }

    private static _toDish(jsonResult: any): Dish {
        var ratings = MappingUtils.toRatingUpdateInfo(jsonResult.ratings);
        return <Dish>({
            dish_id: jsonResult.dish_id,
            name: jsonResult.name,
            description: jsonResult.description,
            reference: jsonResult.reference,
            user_id: jsonResult.user_id,
            last_added: jsonResult.last_added,
            tags: jsonResult.tags.map(MappingUtils._toTag),
            ingredients: jsonResult.ingredients.map(MappingUtils._toIngredients),
            ratings: ratings
        });
    }

    private static _toLegend(r: any): LegendSource {

        return <ILegendSource>({
            key: r.key,
            display: r.display
        });
    }

    private static _toSlot(r: any): Slot {
        let slot = <Slot>({
            slot_id: r.slot_id,
            dish: MappingUtils._toDish(r.dish)
        });

        if (MappingUtils.showConsoleLogs) {
            console.log('Parsed slot:', slot);
        }

        return slot;
    }
}