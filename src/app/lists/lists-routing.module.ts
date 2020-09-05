import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ManageListsComponent} from "./manage-lists/manage-lists.component";
import {AuthGuardHandler} from "../shared/handlers/auth-guard-handler";
import {SignUpComponent} from "../user/sign-up/sign-up.component";
import {EditListComponent} from "./edit-list/edit-list.component";


const routes: Routes = [
  {
    path: 'manage',
    component: ManageListsComponent,
    data: {
      title: 'The List Shop | Lists',
      content: 'The List Shop | Lists'
    },
    canActivate: [AuthGuardHandler]
  },
  {
    path: 'edit/:id',
    component: EditListComponent,
    data: {
      title: 'The List Shop | Edit List',
      content: 'The List Shop | Edit List'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListsRoutingModule { }
