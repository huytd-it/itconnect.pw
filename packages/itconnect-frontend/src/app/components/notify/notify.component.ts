import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotifyItem} from "../../models/common";
import * as _ from "lodash";
import {NotifyService} from "../../services/notify.service";
import {Subscription} from "rxjs";

type ONotifyItem = NotifyItem & {
  timeoutHook: any;
};

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss']
})
export class NotifyComponent implements OnInit, OnDestroy {
  list: ONotifyItem[] = [];
  readonly TIME_REMOVE = 3000;

  private subscription: Subscription;

  constructor(
    private notifyService: NotifyService
  ) {
    this.subscription = this.notifyService.watchPush$.subscribe(value => this.addNotify(value));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
  }

  private addNotify(item: NotifyItem) {
    let itemClone = <ONotifyItem>_.cloneDeep(item);
    const timeout = setTimeout(() => {
      this.onRemove(itemClone);
    }, this.TIME_REMOVE);

    itemClone.timeoutHook = timeout;
    this.list.push(itemClone);
  }

  private onRemove(item: ONotifyItem) {
    this.list = this.list.filter(i => i !== item);
  }

  onClick(item: ONotifyItem) {
    clearTimeout(item.timeoutHook);
    this.onRemove(item);
  }
}
