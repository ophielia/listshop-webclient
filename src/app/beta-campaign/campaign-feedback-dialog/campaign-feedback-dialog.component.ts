import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TagTreeService} from "../../shared/services/tag-tree.service";
import {CampaignFeedback} from "../../model/campaignfeedback";

@Component({
  selector: 'app-campaign-feedback-dialog',
  templateUrl: './campaign-feedback-dialog.component.html',
  styleUrls: ['./campaign-feedback-dialog.component.scss']
})
export class CampaignFeedbackDialogComponent implements OnInit {
  @Output() feedbackInfo: EventEmitter<CampaignFeedback> = new EventEmitter<CampaignFeedback>();

  email: string;
  feedback: string;
  constructor(

  ) { }

  ngOnInit(): void {
  }

   submitFeedback() {
    console.log("submitting feedback, as requested");
    var campaignInfo = new CampaignFeedback();
    campaignInfo.email = this.email;
    campaignInfo.text = this.feedback;

    this.feedbackInfo.emit(campaignInfo);

  }

}
