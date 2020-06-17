import { Component, OnInit } from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
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
  private returnUrl: string;

  constructor(private route: ActivatedRoute,
              private title: Title,
              private meta: Meta,
              private router: Router,
              private authenticationService: AuthenticationService) {
    // initialize variable value
    this.show = false;
  }

  ngOnInit() {
    this.title.setTitle( this.route.snapshot.data['title']);
    this.meta.updateTag({name: 'description', content: this.route.snapshot.data['content']});

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/lists/manage';
  }

  // click event function toggle
  password() {
    this.show = !this.show;
  }

  doLogin() {
    this.authenticationService.login(this.email, this.userPassword)
        .subscribe( success => {
          if (!success) {
            var error: Error = Error("BADCREDENTIALS");
            throw error;
          }
          this.router.navigateByUrl(this.returnUrl);
        })
  }

}
