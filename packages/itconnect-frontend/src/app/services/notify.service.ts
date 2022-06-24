import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {NotifyItem} from "../models/common";

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  private watchPushSubject: Subject<NotifyItem>;
  readonly watchPush$: Observable<NotifyItem>;

  constructor() {
    this.watchPushSubject = new Subject<NotifyItem>();
    this.watchPush$ = this.watchPushSubject.asObservable();
  }

  notify(type: 'error' | 'warning' | 'success', title: string, description: string) {
    this.watchPushSubject.next({
      type,
      title,
      description
    })
  }

  success(title: string, description: string) {
    this.notify('success', title, description);
  }

  error(title: string, description: string) {
    this.notify('error', title, description);
  }

  warning(title: string, description: string) {
    this.notify('warning', title, description);
  }
}
