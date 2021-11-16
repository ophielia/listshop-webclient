import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardHandler} from "../shared/handlers/auth-guard-handler";
import {ManageMealPlansComponent} from "./manage-mealplans/manage-meal-plans.component";


const routes: Routes = [
     {
        path: 'list',
         component: ManageMealPlansComponent,
         data: {
             title: 'The List Shop | My Meal Plans',
             content: 'The List Shop | My Meal Plans'
         },
         canActivate: [AuthGuardHandler]
    },
   /* {
        path: 'edit/:id',
        component: EditDishComponent,
        data: {
            title: 'The List Shop | Edit Dish',
            content: 'The List Shop | Edit Dish'
        }
    },*/
    {
        path: '',
        component: ManageMealPlansComponent,
        data: {
            title: 'The List Shop | My Meal Plans',
            content: 'The List Shop | My Meal Plans'
        },
        canActivate: [AuthGuardHandler]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MealPlansRoutingModule {
}
