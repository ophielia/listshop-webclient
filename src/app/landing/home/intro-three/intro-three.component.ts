import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-intro-three',
  templateUrl: './intro-three.component.html',
  styleUrls: ['./intro-three.component.scss']
})
export class IntroThreeComponent {

  constructor(private modalService: NgbModal) { }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

}
