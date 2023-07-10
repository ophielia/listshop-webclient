import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EnvironmentLoaderService} from "../../../shared/services/environment-loader.service";
import {NGXLogger} from "ngx-logger";
import {AuthenticationService} from "../../../shared/services/authentication.service";
import {CampaignFeedback} from "../../../model/campaignfeedback";
import {FeedbackService} from "../../../shared/services/feedback.service";

@Component({
  selector: 'app-main-pitch',
  templateUrl: './main-pitch.component.html',
  styleUrls: ['./main-pitch.component.scss']
})
export class MainPitchComponent implements OnInit {

  appStoreLinkAvailable: boolean = false;
  appStoreLink: String;
  facebookLink: String;
  twitterLink: String;

  @ViewChild('sendfeedback') sendFeedbackModal;
  @ViewChild('allgood') confirmationModal;
  @ViewChild('wehaveaproblem') errorModal;

  constructor(private modalService: NgbModal,
              private envLoader: EnvironmentLoaderService,
              private feedbackService: FeedbackService,
              private logger: NGXLogger,
              private authorizationService: AuthenticationService

  ) {
    var asLink = envLoader.getEnvConfig().appStoreLink;
    var fbLink = envLoader.getEnvConfig().facebookLink;
    var twLink = envLoader.getEnvConfig().twitterLink;
    if (asLink && asLink != 'empty') {
      this.appStoreLink = asLink;
      this.appStoreLinkAvailable = true;
    } else {
      this.appStoreLinkAvailable = false;
    }
    if (fbLink && fbLink != 'empty') {
      this.facebookLink = fbLink;
    }
    if (twLink && twLink != 'empty') {
      this.twitterLink = twLink;
    }

  }

  ngOnInit(): void {
  }

  openSendFeedbackModal() {
    this.sendFeedbackModal.show();

  }


  troubleWithEmail() {
    this.sendFeedbackModal.hide();
    this.errorModal.show();
  }

  submitFeedback(feedback: CampaignFeedback) {
    this.feedbackService.publishFeedback(feedback.email,
        feedback.text)
        .subscribe(r => {
          if (r.status == 204) {
            this.emailSentSuccessfully();
          } else {
            this.troubleWithEmail();
          }
        });
  }

  emailSentSuccessfully() {
    this.sendFeedbackModal.hide();
    this.confirmationModal.show();
  }
}
