import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ManageListsComponent} from "./manage-lists/manage-lists.component";


const routes: Routes = [
  {
    path: 'manage',
    component: ManageListsComponent,
    data: {
      title: 'The List Shop | Lists',
      content: 'The List Shop | Lists'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListsRoutingModule { }
