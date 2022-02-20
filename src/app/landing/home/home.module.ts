import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeComponent } from './home.component';
import { HomeTwoComponent } from './versions/home-two/home-two.component';
import { IntroTwoComponent } from './intro-two/intro-two.component';
import { AboutComponent } from './about/about.component';
import { FeatureComponent } from './feature/feature.component';
import { BlogComponent } from './blog/blog.component';
import { TestimonialComponent } from './testimonial/testimonial.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule,
    NgbModule
  ],
  declarations: [
    HomeComponent,
    HomeTwoComponent,
    IntroTwoComponent,
    AboutComponent,
    FeatureComponent,
    BlogComponent,
    TestimonialComponent
  ],
  providers: []
})
export class HomeModule { }
