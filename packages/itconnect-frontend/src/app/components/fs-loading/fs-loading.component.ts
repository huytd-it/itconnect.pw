import { Component, OnInit } from '@angular/core';
import {AppService} from "../../services/app.service";
import * as _ from "lodash";

@Component({
  selector: 'app-fs-loading',
  templateUrl: './fs-loading.component.html',
  styleUrls: ['./fs-loading.component.scss']
})
export class FsLoadingComponent implements OnInit {
  isShow: boolean;

  constructor(
    private appService: AppService
  ) {
    this.appService.fsLoading$.subscribe(_.debounce(value => {
      this.appService.setFsLoading(!value);
    }, 500));
  }

  ngOnInit(): void {
  }
}
