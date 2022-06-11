import {Component, OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {AuthenticationService} from "../../../shared/services/authentication.service";


@Component({
  selector: 'app-intro-two',
  templateUrl: './intro-two.component.html',
  styleUrls: ['./intro-two.component.scss']
})
export class IntroTwoComponent implements OnInit {

  isLoggedIn: boolean;
  constructor(private modalService: NgbModal,
              private authorizationService: AuthenticationService

  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authorizationService.isAuthenticated();
  }


  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

}
