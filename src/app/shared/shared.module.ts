import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserHeaderComponent } from './user-header/user-header.component';


// Services
import { WINDOW_PROVIDERS } from './services/windows.service';
import { LandingFixService } from '../shared/services/landing-fix.service';
import { LoaderComponent } from './loader/loader.component';
import { ListShopHeaderComponent } from './list-shop-header/list-shop-header.component';
import {AuthenticationService} from "./services/authentication.service";
import { AlertComponent } from './alert/alert.component';
import {AlertService} from "./services/alert.service";

@NgModule({
  exports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
      UserHeaderComponent,
      ListShopHeaderComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxPageScrollModule,
    NgbModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
      UserHeaderComponent,
      ListShopHeaderComponent
  ],
  providers: [
    WINDOW_PROVIDERS,
    LandingFixService,
      AuthenticationService
  ]
})
export class SharedModule { }
