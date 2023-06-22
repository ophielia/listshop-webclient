import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../shared/services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-anonymous-beta-test',
  templateUrl: './anonymous-beta-test.component.html',
  styleUrls: ['./anonymous-beta-test.component.scss']
})
export class AnonymousBetaTestComponent implements OnInit {
  public isLoggedIn: boolean;
  public signedUp: boolean = false;

  constructor(private authorizationService : AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authorizationService.isAuthenticated();
  }

  redirectToLogin() {
    var url = "user/login";
    this.router.navigateByUrl(url);
  }
}
