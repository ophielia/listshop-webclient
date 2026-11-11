import {Injectable} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import {NGXLogger} from "ngx-logger";

@Injectable({providedIn: "root"})
export class AuthGuardHandler  {

  constructor(public authenticationService: AuthenticationService,
              public router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.authenticationService.isAuthenticated();

  }
}
