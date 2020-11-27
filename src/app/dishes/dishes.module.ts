import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DishesRoutingModule} from './dishes-routing.module';
import {SharedModule} from "../shared/shared.module";
import {InputSwitchModule} from "primeng/inputswitch";
import {FormsModule} from "@angular/forms";
import {ManageDishesComponent} from "./manage-dishes/manage-dishes.component";
import {DishesComponent} from "./dishes.component";


@NgModule({
    declarations: [DishesComponent,
        ManageDishesComponent],
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
