import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable, take} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {PermissionService} from "../../services/permission.service";
import {AppRole} from "../../models/permission.model";


@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private permissionService: PermissionService,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const { data: { permission } } = route;

    /**
     * Because permission not loaded
     *
     */
    return new Observable<boolean>(obs => {

      /**
       *  Waiting loaded
       *  Has data can run check so take 1, else take 2 waiting data
       *
       */
      const takeCount = this.authService.data ? 1 : 2;
      this.authService.data$.pipe(take(takeCount)).subscribe(data => {
        if (!data) {
          return;
        }
        const r = this.permissionService.hasPermission(permission);
        if (!r) {
          let routeTo: string;
          switch (this.authService.data?.user.role) {
            case AppRole.Begin:
              routeTo = 'complete-profile'
              break;

            case AppRole.Admin:
              routeTo = 'admin'
              break;

            case AppRole.Ban:
              routeTo = 'ban'
              break;

            default:
              routeTo = 'home';
          }
          this.router.navigate(['/u/' + routeTo]).then(() => {});
        }
        obs.next(true);
      })

    })
  }
}
