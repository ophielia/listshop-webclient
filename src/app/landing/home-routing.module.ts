import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeTwoComponent} from './home/versions/home-two/home-two.component';
import {AboutmeComponent} from "./aboutme/aboutme.component";
import {PrivacyComponent} from "./privacy/privacy.component";
import {BetaTestComponent} from "./beta-test/beta-test.component";
import {AuthGuardHandler} from "../shared/handlers/auth-guard-handler";
import {AnonymousBetaTestComponent} from "./anonymous-beta-test/anonymous-beta-test.component";

// Routes
const routes: Routes = [
    {
        path: '',
        component: HomeTwoComponent,
        data: {
            title: 'The List Shop',
            content: 'Your shopping mealPlans - quickly'
        },
    },
    {
        path: 'aboutme',
        component: AboutmeComponent,
        data: {
            title: 'The List Shop',
            content: 'Your shopping mealPlans - how it started'
        },
    },
    {
        path: 'theapp',
        component: BetaTestComponent,
        data: {
            title: 'The List Shop | The App',
            content: 'The List Shop | The App',

        },
        canActivate: [AuthGuardHandler]
    },
    {
        path: 'loggedout/theapp',
        component: AnonymousBetaTestComponent,
        data: {
            title: 'The List Shop | The App',
            content: 'The List Shop | The App',

        }
    },
    {
        path: 'privacy',
        component: PrivacyComponent,
        data: {
            title: 'The List Shop',
            content: 'Your shopping mealPlans - how it started'
        }
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {
}
