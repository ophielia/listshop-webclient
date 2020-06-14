import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeOneComponent } from './versions/home-one/home-one.component';
import { HomeTwoComponent } from './versions/home-two/home-two.component';
import { HomeThreeComponent } from './versions/home-three/home-three.component';

// Routes
const routes: Routes = [
  {
    path: 'one',
    component: HomeOneComponent,
    data: {
      title: 'Demo 1 | Angular Universal',
      content: 'Demo1 | Theme with SSR Integration'
    }
  },
  {
    path: 'two',
    component: HomeTwoComponent,
    data: {
      title: 'Demo 2 | SSR Integration',
      content: 'Demo2 | Best Landing Page in Angular using Angular Universal | SSR'
    }
  },
  {
    path: 'three',
    component: HomeThreeComponent,
    data: {
      title: 'Demo 3 | SEO Friendly',
      content: 'Demo 3 | SEO Friendly Angular 8 Landing Page '
    }
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
