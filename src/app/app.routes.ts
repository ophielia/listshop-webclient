import { Routes, RouterModule } from '@angular/router';
import { DemoComponent } from './landing/demo/demo.component';
import { BlogComponent } from './landing/blog/blog.component';
import {UserComponent} from "./user/user.component";
import {ListsComponent} from "./lists/lists.component";

export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: 'home/two',
    pathMatch: 'full'
  },
  {
    path: 'demo',
    component: DemoComponent
  },
  {
    path: 'home',
    loadChildren: () => import('./landing/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'blog',
    component: BlogComponent,
    loadChildren:  () => import('./landing/blog/blog.module').then(m => m.BlogModule)
  },
  {
    path: 'pages',
    loadChildren:  () => import('./landing/pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: 'user',
    component: UserComponent,
    loadChildren:  () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'lists',
    component: ListsComponent,
    loadChildren:  () => import('./lists/lists.module').then(m => m.ListsModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

