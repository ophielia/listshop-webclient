import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../shared/services/authentication.service";

@Component({
  selector: 'app-beta-test',
  templateUrl: './beta-test.component.html',
  styleUrls: ['./beta-test.component.scss']
})
export class BetaTestComponent implements OnInit {
  public isLoggedIn: boolean;
  public signedUp: boolean = false;

  constructor(private authorizationService : AuthenticationService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authorizationService.isAuthenticated();
    this.loadUserProperties();
  }

  signUpForNotification() {

  }

  sendTestInformation() {

  }

  private loadUserProperties() {

  }
}
