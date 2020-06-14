import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {SignUpComponent} from "./sign-up/sign-up.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'The List Shop | Login',
      content: 'The List Shop | Login'
    }
  },
  {
    path: 'signup',
    component: SignUpComponent,
    data: {
      title: 'The List Shop | Sign Up',
      content: 'The List Shop | Sign Up'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
