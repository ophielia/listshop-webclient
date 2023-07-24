import {NgxSpinnerService} from "ngx-spinner";
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EnvironmentLoaderService} from "../../../shared/services/environment-loader.service";
import {NGXLogger} from "ngx-logger";
import {AuthenticationService} from "../../../shared/services/authentication.service";
import {CampaignFeedback} from "../../../model/campaignfeedback";
import {FeedbackService} from "../../../shared/services/feedback.service";
import {Subscription} from "rxjs";
import {Meta} from "@angular/platform-browser";

@Component({
  selector: 'app-main-pitch',
  templateUrl: './main-pitch.component.html',
  styleUrls: ['./main-pitch.component.scss']
})
export class MainPitchComponent implements OnInit, OnDestroy {

  appStoreLinkAvailable: boolean = false;
  appStoreLink: String;
  facebookLink: String;
  twitterLink: String;
  linksLoading = true;

  @ViewChild('sendfeedback') sendFeedbackModal;
  @ViewChild('allgood') confirmationModal;
  @ViewChild('wehaveaproblem') errorModal;

  unsubscribe: Subscription[] = [];

  constructor(private modalService: NgbModal,
              private envLoader: EnvironmentLoaderService,
              private feedbackService: FeedbackService,
              private spinner: NgxSpinnerService,
              private meta: Meta,
              private logger: NGXLogger,
              private authorizationService: AuthenticationService

  ) {
    this.loadConfig();
    this.meta.addTag({name: 'twitter:card', content: "summary"});
    this.meta.addTag({name: 'twitter:site', content: "http://thelistshop.app"});
    this.meta.addTag({name: 'twitter:creator', content: "@Marmarmotte"});
    this.meta.addTag({name: 'twitter:title', content: "New App on the Horizon"});
    this.meta.addTag({name: 'twitter:description', content: "There's a new app coming - The List Shop. Available now for testing"});
    this.meta.addTag({name: 'twitter:image', content: "http://thelistshop.app/assets/images/listshop/applanding/promo.png"});

  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.unsubscribe.forEach(s => s.unsubscribe());
  }

  loadConfig() {
    this.linksLoading = true
    let sub$ = this.envLoader
        .getEnvConfigWhenReady()
        .subscribe(config => {
          if (config) {
            var asLink = config.appStoreLink;
            var fbLink = config.facebookLink;
            var twLink = config.twitterLink;
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
        //    this.linksLoading = false;
          }
        });
    this.unsubscribe.push(sub$);
  }

  openSendFeedbackModal() {
    this.sendFeedbackModal.show();

  }


  troubleWithEmail() {
    this.sendFeedbackModal.hide();
    this.errorModal.show();
  }

  submitFeedback(feedback: CampaignFeedback) {
    this.spinner.show();
    this.feedbackService.publishFeedback(feedback.email,
        feedback.text)
        .subscribe(r => {
          this.spinner.hide();
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

  goToTheParty() {

  }
}
