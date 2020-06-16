import { Component, OnInit } from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from "../../shared/services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = "";
  userPassword: string = "";

  // variable
  show: boolean;

  constructor(private route: ActivatedRoute,
              private title: Title,
              private meta: Meta,
              private authenticationService: AuthenticationService) {
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

  doLogin() {
    console.log("email: " + this.email);
    console.log("userPassword: " + this.userPassword);
    this.authenticationService.login(this.email, this.userPassword)
        .subscribe( success => {
          if (!success) {
            var error: Error = Error("BADCREDENTIALS");
            throw error;
          }
          console.log("SUCCESS!! user is " + success);
        })
  }

}
