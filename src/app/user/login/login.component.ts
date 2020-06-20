import { Component, OnInit } from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from "../../shared/services/authentication.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginInfo = {email: '', userPassword: ''}
  loginForm: FormGroup;

  // variable
  show: boolean;
  private returnUrl: string;

  constructor(private route: ActivatedRoute,
              private title: Title,
              private meta: Meta,
              private router: Router,
              private fb: FormBuilder,
              private authenticationService: AuthenticationService) {
    // initialize variable value
    this.show = false;
  }

  ngOnInit() {
    this.title.setTitle( this.route.snapshot.data['title']);
    this.meta.updateTag({name: 'description', content: this.route.snapshot.data['content']});

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/lists/manage';
    this.loginForm = this.fb.group({
            email: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
            userPassword: ["", [Validators.required,Validators.minLength(4) , Validators.maxLength(50)]],
          }, {updateOn: 'blur'});

  }

  // click event function toggle
  password() {
    this.show = !this.show;
  }

  get email() { return this.loginForm.get('email'); }
  get userPassword() { return this.loginForm.get('userPassword'); }

  doLogin() {
    this.authenticationService.login(this.loginForm.get('email').value.trim(),
        this.loginForm.get('userPassword').value.trim())
        .subscribe( success => {
          if (!success) {
            var error: Error = Error("BADCREDENTIALS");
            throw error;
          }
          this.router.navigateByUrl(this.returnUrl);
        })
  }

}
