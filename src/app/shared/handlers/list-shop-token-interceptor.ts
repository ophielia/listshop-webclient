import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {NGXLogger} from "ngx-logger";

@Injectable()
export class ListShopTokenInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var token = this.getToken();

        // is login call
        console.dir(request);
        let isLoginCall = request.url.endsWith("/auth") && request.method == "POST";
        console.log(isLoginCall);
        if (token && !isLoginCall) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return next.handle(request);
        } else {
            request = request.clone({
                setHeaders: {
                    'Content-Type': 'application/json'
                }
            });
            return next.handle(request);
        }
    }

    getToken(): string {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var token = currentUser && currentUser.token;
        return token;
    }
}
