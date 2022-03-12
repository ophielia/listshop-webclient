import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {UserRoutingModule} from './user-routing.module';
import {LoginComponent} from './login/login.component';
import {SharedModule} from "../shared/shared.module";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {TokenGatewayComponent} from "./token-gateway/token-gateway.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {ResetConfirmComponent} from "./reset-confirm/reset-confirm.component";
import {PasswordTokenComponent} from "./password-token/password-token.component";


@NgModule({
    declarations: [LoginComponent,
        SignUpComponent,
        ChangePasswordComponent,
        ResetPasswordComponent,
        ResetConfirmComponent,
        PasswordTokenComponent,
        TokenGatewayComponent],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        UserRoutingModule,
        SharedModule
    ]
})
export class UserModule {
}
