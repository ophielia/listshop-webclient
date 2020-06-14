import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListsRoutingModule } from './lists-routing.module';
import { ManageListsComponent } from './manage-lists/manage-lists.component';
import {ListsComponent} from "./lists.component";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [ManageListsComponent,
  ListsComponent],
  imports: [
    CommonModule,
    ListsRoutingModule,
      SharedModule
  ]
})
export class ListsModule { }
