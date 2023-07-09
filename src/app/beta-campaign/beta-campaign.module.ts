import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { MainPitchComponent } from './landing/main-pitch/main-pitch.component';
import { PitchFeaturesComponent } from './landing/pitch-features/pitch-features.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [LandingComponent, MainPitchComponent, PitchFeaturesComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class BetaCampaignModule { }
