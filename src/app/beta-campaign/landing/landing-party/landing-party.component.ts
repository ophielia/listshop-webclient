import { Component, OnInit } from '@angular/core';
import {CelebrationService} from "../../../shared/services/celebration.service";
import {AuthenticationService} from "../../../shared/services/authentication.service";

@Component({
  selector: 'app-landing-party',
  templateUrl: './landing-party.component.html',
  styleUrls: ['./landing-party.component.scss']
})
export class LandingPartyComponent implements OnInit {
  public partyTitle: string = "";
  public partyText: string = "";

  constructor(private celebrationService : CelebrationService) { }

  ngOnInit(): void {

    var celebration = this.celebrationService.currentCelebration();
    if (celebration) {
      this.partyText = celebration.party_text;
      this.partyTitle = celebration.party_title;
    }
  }
}
