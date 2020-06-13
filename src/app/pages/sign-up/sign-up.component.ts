import { Component, OnInit } from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

   // variable
  show: boolean;

  constructor(private route: ActivatedRoute,
    private title: Title,
    private meta: Meta) {
  // initialize variable value
   this.show = false;
  }

  // click event function toggle
  password() {
   this.show = !this.show;
  }

  ngOnInit() {
    this.title.setTitle( this.route.snapshot.data['title']);
  }

}
