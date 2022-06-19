import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../shared/services/authentication.service";

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.scss']
})
export class PartyComponent implements OnInit {
  public isLoggedIn: boolean;

  constructor(private authorizationService : AuthenticationService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authorizationService.isAuthenticated();
  }

}
