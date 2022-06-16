import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "../../services/auth.service";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.authService.token;
    if (!token) {
      this.router.navigate(['/']).then(r => {});
      return false;
    }
    return true;
  }
}
