import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardHandler} from "../shared/handlers/auth-guard-handler";
import {ManageDishesComponent} from "./manage-dishes/manage-dishes.component";
import {EditListComponent} from "../lists/edit-list/edit-list.component";
import {EditDishComponent} from "./edit-dish/edit-dish.component";


const routes: Routes = [
    {
        path: 'manage',
        component: ManageDishesComponent,
        data: {
            title: 'The List Shop | My Dishes',
            content: 'The List Shop | My Dishes'
        },
        canActivate: [AuthGuardHandler]
    },
    {
        path: 'edit/:id',
        component: EditDishComponent,
        data: {
            title: 'The List Shop | Edit List',
            content: 'The List Shop | Edit List'
        }
    },
    {
        path: '',
        component: ManageDishesComponent,
        data: {
            title: 'The List Shop | My Dishes',
            content: 'The List Shop | My Dishes'
        },
        canActivate: [AuthGuardHandler]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DishesRoutingModule {
}
