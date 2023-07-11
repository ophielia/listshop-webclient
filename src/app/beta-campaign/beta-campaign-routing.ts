import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthGuardHandler} from "../shared/handlers/auth-guard-handler";
import {LandingComponent} from "./landing/landing.component";



const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    data: {
      title: 'The List Shop App',
      content: 'The List Shop App'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListsRoutingModule { }
