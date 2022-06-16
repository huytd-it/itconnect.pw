import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable()
export class Error401Intercept implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('error 401 intercept!');
    return next.handle(req).pipe(catchError(err => {
      if(err.status === 401) {
        this.authService.logout();
        this.router.navigate(['/']).then(r => {});
      }
      return throwError(err);
    }));
  }
}
