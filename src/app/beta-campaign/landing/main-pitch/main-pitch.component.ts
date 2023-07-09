import { Component, OnInit } from '@angular/core';
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
  }

}
