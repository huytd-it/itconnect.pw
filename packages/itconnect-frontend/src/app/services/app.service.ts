import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private fsLoadingSubject: BehaviorSubject<boolean>;
  readonly fsLoading$: Observable<boolean>;
  private headLoadingSubject: BehaviorSubject<boolean>;
  readonly headLoading$: Observable<boolean>;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.fsLoadingSubject = new BehaviorSubject<boolean>(false);
    this.fsLoading$ = this.fsLoadingSubject.asObservable();
    this.headLoadingSubject = new BehaviorSubject<boolean>(false);
    this.headLoading$ = this.headLoadingSubject.asObservable();
    setTimeout(() => this.checkStatusServer());
  }

  setFsLoading(status: boolean) {
    this.fsLoadingSubject.next(status);
  }

  setHeadLoading(status: boolean) {
    this.headLoadingSubject.next(status);
  }

  status() {
    return this.httpClient.get('');
  }

  checkStatusServer(callback?: () => void) {
    this.status()
      .pipe(catchError((e) => {
        if (!this.router.url.match(/\/maintenance/)) {
          this.router.navigate(['/maintenance']).then(() => {});
        }
        if (callback) {
          callback();
        }
        return throwError(e);
      }))
      .subscribe(() => {
        if (this.router.url.match(/\/maintenance/)) {
          this.router.navigate(['/']).then(() => {});
        }
        if (callback) {
          callback();
        }
      });
  }
}
