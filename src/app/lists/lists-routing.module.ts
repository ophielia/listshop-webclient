import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ManageListsComponent} from "./manage-lists/manage-lists.component";
import {AuthGuardHandler} from "../shared/handlers/auth-guard-handler";


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
    path: '',
    component: ManageListsComponent,
    data: {
      title: 'The List Shop | Lists',
      content: 'The List Shop | Lists'
    },
    canActivate: [AuthGuardHandler]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListsRoutingModule { }
