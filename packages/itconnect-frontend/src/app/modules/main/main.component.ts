import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {AppService} from "../../services/app.service";
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";
import * as _ from "lodash";
import {environment} from "src/environments/environment";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  isLoaded: boolean;

  constructor(
    private renderer: Renderer2,
    private appService: AppService,
    private authService: AuthService
  ) {
    this.renderer.addClass(document.body, 'main-module');
    this.userSubscription = this.authService.data$.subscribe((val) => {
      if (this.authService.token) {
        this.isLoaded = !!val;
      }
    })
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'main-module');
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
  }

  private setLoadingDebounce = _.debounce((status: boolean) => {
    this.appService.setFsLoading(status);
  }, environment.production ? 500 : 0);
}

