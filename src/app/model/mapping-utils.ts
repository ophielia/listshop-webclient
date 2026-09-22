import {User} from "./user";
import {ITag} from "./tag";
import {Dish, IDish} from "./dish";
import {ILegendSource, LegendSource} from "./legend-source";
import {MealPlan} from "./mealplan";
import {Slot} from "./slot";
import {RatingUpdateInfo} from "./rating-update-info";
import {IRatingInfo, RatingInfo} from "./rating-info";
import {DishRatingInfo, IDishRatingInfo} from "./dish-rating-info";
import {UserProperty} from "./userproperty";
import {Celebration} from "./celebration";
import {ISuggestion} from "./suggestion";


export default class MappingUtils {

    static showConsoleLogs: boolean = false;

    static toUser(r: any): User {
        if (!r) {
            return null;
        }
        let userSource = r.user ? r.user : r;
        return <User>({
            email: userSource.email,
            creation_date: userSource.creation_date,
            user_name: userSource.user_name,
            roles: userSource.roles,
            token: userSource.token

        });
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
        let dish = new Dish()

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
        let source = r.user_property ? r.user_property : r;
        return <UserProperty>({
            key: source.key,
            value: source.value
        });
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
        return new DishRatingInfo();
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
            is_liquid: jsonResult.is_liquid
        })
    }


    private static _toDish(jsonResult: any): Dish {
        var ratings = MappingUtils.toRatingUpdateInfo(jsonResult.ratings);
        return new Dish();
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
