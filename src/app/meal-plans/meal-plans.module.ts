import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MealPlansRoutingModule} from './meal-plans-routing.module';
import {SharedModule} from "../shared/shared.module";
import {InputSwitchModule} from "primeng/inputswitch";
import {FormsModule} from "@angular/forms";
import {NgbRatingModule} from "@ng-bootstrap/ng-bootstrap";
import {MealPlansComponent} from "./meal-plans.component";


@NgModule({
    declarations: [MealPlansComponent,
        ],
    imports: [
        CommonModule,
        MealPlansRoutingModule,
        SharedModule,
        InputSwitchModule,
        FormsModule,
        NgbRatingModule
    ]
})
export class MealPlansModule {
}
