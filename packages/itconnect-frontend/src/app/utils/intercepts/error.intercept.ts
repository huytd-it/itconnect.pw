import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {NotifyService} from "../../services/notify.service";

@Injectable()
export class ErrorIntercept implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private notifyService: NotifyService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      this.notifyService.error(err.error.error, err.error.message);
      if(
        err.status === 401 &&
        !req.url.match(/main\/auth/)
      ) {
        this.authService.logout();
        this.router.navigate(['/']).then(r => {});
      }
      return throwError(err);
    }));
  }
}
