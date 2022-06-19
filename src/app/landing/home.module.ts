import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeComponent } from './home.component';
import { HomeTwoComponent } from './home/versions/home-two/home-two.component';
import { IntroTwoComponent } from './home/intro-two/intro-two.component';
import { AboutComponent } from './home/about/about.component';
import { FeatureComponent } from './home/feature/feature.component';
import { TestimonialComponent } from './home/testimonial/testimonial.component';
import {AboutmeComponent} from "./aboutme/aboutme.component";
import {ContentHeaderComponent} from "./contentheader/content-header.component";
import {PrivacyComponent} from "./privacy/privacy.component";
import {BetaTestComponent} from "./beta-test/beta-test.component";
import {AnonymousBetaTestComponent} from "./anonymous-beta-test/anonymous-beta-test.component";
import {NgxSpinnerModule} from "ngx-spinner";
import { PartyComponent } from './celebration/party.component';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        CarouselModule,
        NgbModule,
        NgxSpinnerModule
    ],
  declarations: [
    HomeComponent,
    HomeTwoComponent,
    AboutmeComponent,
    PrivacyComponent,
    ContentHeaderComponent,
    IntroTwoComponent,
    AboutComponent,
    FeatureComponent,
    TestimonialComponent,
    BetaTestComponent,
    AnonymousBetaTestComponent,
    PartyComponent
  ],
  providers: []
})
export class HomeModule { }
