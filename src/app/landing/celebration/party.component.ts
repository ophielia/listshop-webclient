import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../shared/services/authentication.service";
import {CelebrationService} from "../../shared/services/celebration.service";

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.scss']
})
export class PartyComponent implements OnInit {
public isLoggedIn : boolean = false;
  public partyTitle: string = "";
  public partyText: string = "";

  constructor(private celebrationService : CelebrationService,
              private authorizationService: AuthenticationService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authorizationService.isAuthenticated();
    var celebration = this.celebrationService.currentCelebration();
    if (celebration) {
      this.partyText = celebration.party_text;
      this.partyTitle = celebration.party_title;
    }
  }

}
