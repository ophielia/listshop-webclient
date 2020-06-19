import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import {SharedModule} from "../shared/shared.module";
import { SignUpComponent } from './sign-up/sign-up.component';



@NgModule({
  declarations: [LoginComponent, SignUpComponent],
  imports: [
      ReactiveFormsModule,
    CommonModule,
    UserRoutingModule,
      SharedModule
  ]
})
export class UserModule { }
