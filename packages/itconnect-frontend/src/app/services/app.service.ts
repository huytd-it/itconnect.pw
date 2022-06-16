import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private fsLoadingSubject: BehaviorSubject<boolean>;
  readonly fsLoading$: Observable<boolean>;

  constructor() {
    this.fsLoadingSubject = new BehaviorSubject<boolean>(false);
    this.fsLoading$ = this.fsLoadingSubject.asObservable();
  }

  setFsLoading(status: boolean) {
    this.fsLoadingSubject.next(status);
  }
}
