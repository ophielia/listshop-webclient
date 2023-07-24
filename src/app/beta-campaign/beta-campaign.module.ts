import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { MainPitchComponent } from './landing/main-pitch/main-pitch.component';
import { PitchFeaturesComponent } from './landing/pitch-features/pitch-features.component';
import {RouterModule} from "@angular/router";
import { CampaignFeedbackDialogComponent } from './campaign-feedback-dialog/campaign-feedback-dialog.component';
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {NgxSpinnerModule} from "ngx-spinner";
import { LandingPartyComponent } from './landing/landing-party/landing-party.component';



@NgModule({
  declarations: [LandingComponent, MainPitchComponent, PitchFeaturesComponent, CampaignFeedbackDialogComponent, LandingPartyComponent],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        SharedModule,
        NgxSpinnerModule
    ]
})
export class BetaCampaignModule { }
