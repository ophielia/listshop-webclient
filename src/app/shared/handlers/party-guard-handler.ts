import {Injectable} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {CelebrationService} from "../services/celebration.service";

@Injectable({providedIn: "root"})
export class PartyGuardHandler implements CanActivate {

  constructor(public celebrationService: CelebrationService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.celebrationService.weAreCelebrating()) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
