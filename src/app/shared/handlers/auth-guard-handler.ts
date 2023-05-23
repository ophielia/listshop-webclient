import {Injectable} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {NGXLogger} from "ngx-logger";

@Injectable({providedIn: "root"})
export class AuthGuardHandler implements CanActivate {

  constructor(public authenticationService: AuthenticationService,
              public router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.authenticationService.isAuthenticated();

  }
}
