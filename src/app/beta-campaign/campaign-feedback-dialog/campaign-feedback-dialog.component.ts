import { Component, OnInit } from '@angular/core';
import {TagTreeService} from "../../shared/services/tag-tree.service";

@Component({
  selector: 'app-campaign-feedback-dialog',
  templateUrl: './campaign-feedback-dialog.component.html',
  styleUrls: ['./campaign-feedback-dialog.component.scss']
})
export class CampaignFeedbackDialogComponent implements OnInit {

  email: string;
  feedback: string;
  constructor(

  ) { }

  ngOnInit(): void {
  }

   submitFeedback() {
    console.log("submitting feedback, as requested");
  }

}
