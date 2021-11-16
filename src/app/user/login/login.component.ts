import { Component, OnInit } from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from "../../shared/services/authentication.service";
//import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginInfo = {email: '', userPassword: ''}

  username : string = "";
  password : string = "";

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

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/mealPlans/manage';


  }

  // click event function toggle
  showPassword() {
    this.show = !this.show;
  }


  doLogin() {
    this.authenticationService.login(this.username,
        this.password)
        .subscribe( success => {
          if (!success) {
            var error: Error = Error("BADCREDENTIALS");
            throw error;
          }
          console.log(this.returnUrl);
          this.router.navigateByUrl(this.returnUrl);
        })
  }

    /*
    keyPressSubmit($event: KeyboardEvent, loginForm: FormGroup) {

      if ($event.key == "U+000D" ) {
          this.doLogin();
      }
    }
     */

}
