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
import {ListService} from "./services/list.service";
import {DishService} from "./services/dish.service";
import {DishSelectComponent} from "./components/dish-select/dish-select.component";
import {AutoCompleteModule} from "primeng/autocomplete";
import {FormsModule} from "@angular/forms";
import {TagSelectComponent} from "./components/tag-select/tag-select.component";
import {TagService} from "./services/tag.service";
import {ListSelectComponent} from "./components/list-select/list-select.component";

@NgModule({
  exports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    UserHeaderComponent,
    ListShopHeaderComponent,
    DishSelectComponent,
    TagSelectComponent,
      ListSelectComponent

  ],
    imports: [
        CommonModule,
        RouterModule,
        NgxPageScrollModule,
        NgbModule,
        AutoCompleteModule,
        FormsModule
    ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
      UserHeaderComponent,
      ListShopHeaderComponent,
      DishSelectComponent,
      TagSelectComponent,
      ListSelectComponent
  ],
  providers: [
    WINDOW_PROVIDERS,
    LandingFixService,
      AuthenticationService,
      ListService,
      DishService,
      TagService

  ]
})
export class SharedModule { }
