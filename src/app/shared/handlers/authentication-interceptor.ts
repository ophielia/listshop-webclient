import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {RouteMessageService} from "../services/route-message.service";
import {Observable, of, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import {NGXLogger} from "ngx-logger";


@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService, private router: Router,
                private routeMessageService: RouteMessageService,
                private logger: NGXLogger) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let handled: boolean = false;

        return next.handle(request)
            .pipe(
                retry(1),
                catchError((returnedError) => {
                    let errorMessage = null;

                    if (returnedError.error instanceof ErrorEvent) {
                        errorMessage = `Error: ${returnedError.error.message}`;
                    } else if (returnedError instanceof HttpErrorResponse) {
                        errorMessage = `Error Status ${returnedError.status}`;
                        handled = this.handleServerSideError(returnedError);
                    }

                    this.logger.error(errorMessage ? errorMessage : returnedError);

                    if (!handled) {
                        if (errorMessage) {
                            return throwError(errorMessage);
                        } else {
                            return throwError("Unexpected problem occurred");
                        }
                    } else {
                        return of(returnedError);
                    }
                })
            )
    }

    private handleServerSideError(error: HttpErrorResponse): boolean {
        let handled: boolean = false;

        switch (error.status) {
            case 401:
                this.routeMessageService.message = "Please login again.";
                this.authenticationService.logoutAndGoToLoginPage();
                handled = true;
                break;
        }

        return handled;
    }
}