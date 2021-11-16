import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeTwoComponent } from './versions/home-two/home-two.component';

// Routes
const routes: Routes = [
  {
    path: '',
    component: HomeTwoComponent,
    data: {
      title: 'The List Shop',
      content: 'Your shopping mealPlans - quickly'
    }
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
