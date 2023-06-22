import {Component, OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {AuthenticationService} from "../../../shared/services/authentication.service";
import {EnvironmentLoaderService} from "../../../shared/services/environment-loader.service";
import {NGXLogger} from "ngx-logger";


@Component({
  selector: 'app-intro-two',
  templateUrl: './intro-two.component.html',
  styleUrls: ['./intro-two.component.scss']
})
export class IntroTwoComponent implements OnInit {

  isLoggedIn: boolean;
  appStoreLinkAvailable: boolean = false;
  appStoreLink: String;

  constructor(private modalService: NgbModal,
              private envLoader: EnvironmentLoaderService,
              private logger: NGXLogger,
              private authorizationService: AuthenticationService

  ) {
    var link = envLoader.getEnvConfig().appStoreLink;
    if (link && link != 'empty') {
      this.appStoreLink = link;
      this.appStoreLinkAvailable = true;
    } else {
      this.appStoreLinkAvailable = false;
    }

  }

  ngOnInit(): void {
    this.isLoggedIn = this.authorizationService.isAuthenticated();
  }


  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

}
