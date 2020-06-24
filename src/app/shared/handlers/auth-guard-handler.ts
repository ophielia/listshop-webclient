import {ErrorHandler, Injectable, Injector} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {AlertService} from "../services/alert.service";
import {AuthenticationService} from "../services/authentication.service";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {resolve} from "@angular/compiler-cli/src/ngtsc/file_system";

@Injectable({providedIn: "root"})
export class AuthGuardHandler implements CanActivate {

  constructor(public authenticationService: AuthenticationService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authenticationService.isAuthenticated()) {
      this.router.navigate(['/user/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }
    return true;
  }
}
