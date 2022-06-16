import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {Injectable} from "@angular/core";

@Injectable()
export class JwtIntercept implements HttpInterceptor {
  constructor(
    private authService: AuthService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.token}`
        }
      });
    }
    return next.handle(req);
  }
}
