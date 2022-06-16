import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from "rxjs";
import { environment } from 'src/environments/environment';

export class BaseIntercept implements HttpInterceptor{

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.url.startsWith('https://') || req.url.startsWith('http://')) {
      return next.handle(req);
    }

    /**
     * Add base url
     *
     */
    const apiReq = req.clone({
      url: `${environment.baseUrl}/${req.url}`
    });
    return next.handle(apiReq);
  }

}
