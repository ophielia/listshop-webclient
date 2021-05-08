import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DishesRoutingModule} from './dishes-routing.module';
import {SharedModule} from "../shared/shared.module";
import {InputSwitchModule} from "primeng/inputswitch";
import {FormsModule} from "@angular/forms";
import {ManageDishesComponent} from "./manage-dishes/manage-dishes.component";
import {DishesComponent} from "./dishes.component";
import {SingleDishElementComponent} from "./single-dish-element/single-dish-element.component";
import {MealplanSelectComponent} from "./mealplan-select/mealplan-select.component";
import {EditDishComponent} from "./edit-dish/edit-dish.component";


@NgModule({
    declarations: [DishesComponent,
        ManageDishesComponent,
        EditDishComponent,
        MealplanSelectComponent,
        SingleDishElementComponent],
    imports: [
        CommonModule,
        DishesRoutingModule,
        SharedModule,
        InputSwitchModule,
        FormsModule
    ]
})
export class DishesModule {
}
