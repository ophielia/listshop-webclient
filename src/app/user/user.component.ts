import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  isLogin: boolean = false
  isSignup: boolean = false

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log("path: " + this.route.snapshot.pathFromRoot);
  }

}
