import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from "./sign-up/sign-up.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {TokenGatewayComponent} from "./token-gateway/token-gateway.component";

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
  {
    path: 'password',
    component: ChangePasswordComponent,
    data: {
      title: 'The List Shop | Change Password',
      content: 'The List Shop | Change Password'
    }
  },
  {
    path: 'reset',
    component: ChangePasswordComponent,
    data: {
      title: 'The List Shop | Change Password',
      content: 'The List Shop | Change Password'
    }
  },
  {
    path: 'gateway',
    component: TokenGatewayComponent,
    data: {
      title: 'The List Shop | Change Password',
      content: 'The List Shop | Change Password'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
