import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private fsLoadingSubject: BehaviorSubject<boolean>;
  readonly fsLoading$: Observable<boolean>;
  private headLoadingSubject: BehaviorSubject<boolean>;
  readonly headLoading$: Observable<boolean>;

  constructor() {
    this.fsLoadingSubject = new BehaviorSubject<boolean>(false);
    this.fsLoading$ = this.fsLoadingSubject.asObservable();
    this.headLoadingSubject = new BehaviorSubject<boolean>(false);
    this.headLoading$ = this.headLoadingSubject.asObservable();
  }

  setFsLoading(status: boolean) {
    this.fsLoadingSubject.next(status);
  }

  setHeadLoading(status: boolean) {
    this.headLoadingSubject.next(status);
  }
}
