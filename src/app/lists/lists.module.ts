import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListsRoutingModule } from './lists-routing.module';
import { ManageListsComponent } from './manage-lists/manage-lists.component';
import {ListsComponent} from "./lists.component";
import {SharedModule} from "../shared/shared.module";
import {SingleListElementComponent} from "./single-list-element/single-list-element.component";


@NgModule({
  declarations: [ManageListsComponent,
      SingleListElementComponent,
  ListsComponent],
  imports: [
    CommonModule,
    ListsRoutingModule,
      SharedModule
  ]
})
export class ListsModule { }
