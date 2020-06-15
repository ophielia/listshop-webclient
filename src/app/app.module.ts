import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { DemoComponent } from './landing/demo/demo.component';
import { BlogComponent } from './landing/blog/blog.component';
import {UserComponent} from "./user/user.component";
import {ListsModule} from "./lists/lists.module";
import {ListShopTokenInterceptor} from "./shared/handlers/list-shop-token-interceptor";

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
    BlogComponent,
      UserComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    UserModule,
    ListsModule,
    // tslint:disable-next-line: max-line-length
    RouterModule.forRoot(rootRouterConfig, { useHash: false, anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled', initialNavigation: 'enabled' })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ListShopTokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
