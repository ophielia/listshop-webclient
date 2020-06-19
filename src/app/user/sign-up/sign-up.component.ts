import { Component, OnInit } from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from "../../shared/services/authentication.service";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl:  './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {


  show: boolean;
  signUpForm : FormGroup;
  // variable



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
    this.signUpForm = this.fb.group({
          email: ["", []],
          userPassword: ["", []],
          confirmPassword: ["", []]
    });
  }
  // click event function toggle
  password() {
    this.show = !this.show;
  }

  get email() { return this.signUpForm.get('email'); }

  get userPassword() { return this.signUpForm.get('userPassword'); }

  get confirmPassword() { return this.signUpForm.get('confirmPassword'); }


  signUp() {
    // do validation
    this.signUpForm.get("email").setValidators(Validators.required);
    this.signUpForm.get("email").setValidators(Validators.minLength(4));
    this.signUpForm.get("email").setValidators(Validators.maxLength(50));
    this.signUpForm.get("email").setValidators(Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"));
    this.signUpForm.get("email").updateValueAndValidity();

    this.signUpForm.get("userPassword").setValidators(Validators.required);
    this.signUpForm.get("userPassword").setValidators(Validators.minLength(4));
    this.signUpForm.get("userPassword").setValidators(Validators.maxLength(50));
    this.signUpForm.get("userPassword").updateValueAndValidity();

    this.signUpForm.get("confirmPassword").setValidators(Validators.required);
    this.signUpForm.get("confirmPassword").updateValueAndValidity();

    this.signUpForm.setValidators(this.validatePasswordConfirmation);
    this.signUpForm.updateValueAndValidity();

    // create user
    console.log("ok to sign up");
   /* this.authenticationService.createUser(this.signUpForm.get('email').value.trim(),

        this.signUpForm.get('userPassword').value.trim())
        .subscribe( success => {
          if (!success) {
            var error: Error = Error("BADCREDENTIALS");
            throw error;
          }
          this.router.navigateByUrl(this.returnUrl);
        })*/
  }

  validatePasswordConfirmation(group: FormGroup):any {
    var pw = group.controls['userPassword'];
    var pw2 = group.controls['confirmPassword'];

    if (pw.value !== pw2.value) { // this is the trick
      pw2.setErrors({passwordsDontMatch: true});
    }

    // even though there was an error, we still return null
    // since the new error state was set on the individual field
    return null;
  }

}
