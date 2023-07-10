import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EnvironmentLoaderService} from "../../../shared/services/environment-loader.service";
import {NGXLogger} from "ngx-logger";
import {AuthenticationService} from "../../../shared/services/authentication.service";

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

  constructor(private modalService: NgbModal,
              private envLoader: EnvironmentLoaderService,
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

}
