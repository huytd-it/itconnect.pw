import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {AppService} from "../../services/app.service";
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";
import * as _ from "lodash";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;

  constructor(
    private renderer: Renderer2,
    private appService: AppService,
    private authService: AuthService
  ) {
    this.renderer.addClass(document.body, 'main-module');
    this.appService.setFsLoading(true);
    this.userSubscription = this.authService.data$.subscribe(_.debounce(user => {
      if (this.authService.token) {
        this.appService.setFsLoading(!user);
      }
    }, 1000))
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'main-module');
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
  }
}
