import {Routes} from '@angular/router';
import {BlogComponent} from './landing/blog/blog.component';
import {ListsComponent} from "./lists/lists.component";
import {DishesComponent} from "./dishes/dishes.component";
import {UserComponent} from "./user/user.component";
import {MealPlansComponent} from "./meal-plans/meal-plans.component";
import {MealPlansModule} from "./meal-plans/meal-plans.module";
import {HomeTwoComponent} from "./landing/home/versions/home-two/home-two.component";
import {HomeComponent} from "./landing/home.component";

export const rootRouterConfig: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        component: HomeComponent,
        loadChildren: () => import('./landing/home.module').then(m => m.HomeModule)
    },
    {
        path: 'blog',
        component: BlogComponent,
        loadChildren: () => import('./landing/blog/blog.module').then(m => m.BlogModule)
    },
    {
        path: 'pages',
        loadChildren: () => import('./landing/pages/pages.module').then(m => m.PagesModule)
    },
    {
        path: 'user',
        component: UserComponent,
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    },
    {
        path: 'dishes',
        component: DishesComponent,
        loadChildren: () => import('./dishes/dishes.module').then(m => m.DishesModule)
    },
    {
        path: 'lists',
        component: ListsComponent,
        pathMatch: 'prefix',
        loadChildren: () => import('./lists/lists.module').then(m => m.ListsModule)
    },

    {
        path: 'mealplans',
        component: MealPlansComponent,
        loadChildren: () => import('./meal-plans/meal-plans.module').then(m => m.MealPlansModule)
    },

];

