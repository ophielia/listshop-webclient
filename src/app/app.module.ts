import {APP_INITIALIZER, ErrorHandler, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from './shared/shared.module';
import {UserModule} from './user/user.module';
import {rootRouterConfig} from './app.routes';
import {AppComponent} from './app.component';
import {UserComponent} from "./user/user.component";
import {ListsModule} from "./lists/lists.module";
import {ListShopTokenInterceptor} from "./shared/handlers/list-shop-token-interceptor";
import {ListShopErrorHandler} from "./shared/handlers/list-shop-error-handler";
import {AlertComponent} from "./shared/alert/alert.component";
import {AuthGuardHandler} from "./shared/handlers/auth-guard-handler";
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {AlertService} from "./shared/services/alert.service";
import {NgxSpinnerModule} from "ngx-spinner";
import {PartyGuardHandler} from "./shared/handlers/party-guard-handler";
import {EnvironmentLoaderService} from "./shared/services/environment-loader.service";
import {AuthenticationInterceptor} from "./shared/handlers/authentication-interceptor";

const initAppConfig = (envService: EnvironmentLoaderService) => {
    return () => envService.loadEnvConfig('/assets/config/config.json');
};

@NgModule({
    declarations: [
        AppComponent,
        UserComponent
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'serverApp'}),
        ReactiveFormsModule,
        HttpClientModule,
        NgxSpinnerModule,
        LoggerModule.forRoot({
            level: NgxLoggerLevel.ERROR,
            serverLogLevel: NgxLoggerLevel.ERROR,
            disableConsoleLogging: false
        }),
        BrowserAnimationsModule,
        SharedModule,
        UserModule,
        ListsModule,
        // tslint:disable-next-line: max-line-length
        RouterModule.forRoot(rootRouterConfig, {
            useHash: false,
            anchorScrolling: 'enabled',
            scrollPositionRestoration: 'enabled',
            enableTracing: false,
            initialNavigation: 'enabled'
        })
    ],
    providers: [
        AlertService,
        {provide: HTTP_INTERCEPTORS, useClass: ListShopTokenInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true},
        {provide: ErrorHandler, useClass: ListShopErrorHandler},
        EnvironmentLoaderService,
        {
            provide: APP_INITIALIZER,
            useFactory: initAppConfig,
            multi: true,
            deps: [EnvironmentLoaderService]
        },
        AuthGuardHandler,
        PartyGuardHandler
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
