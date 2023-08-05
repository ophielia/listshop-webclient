import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthGuardHandler} from "../shared/handlers/auth-guard-handler";
import {LandingComponent} from "./landing/landing.component";
import {LandingPartyComponent} from "./landing/landing-party/landing-party.component";



const routes: Routes = [

  {
    path: 'celebrate',
    component: LandingPartyComponent,
    data: {
      title: 'The List Shop App',
      content: 'The List Shop App'
    }
  },
  {
    path: '',
    component: LandingComponent,
    data: {
      title: 'The List Shop App',
      content: 'The List Shop App'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
