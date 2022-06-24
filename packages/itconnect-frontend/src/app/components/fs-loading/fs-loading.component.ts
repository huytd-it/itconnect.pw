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
    this.appService.fsLoading$.subscribe(value => this.isShow = value);
  }

  ngOnInit(): void {
  }
}
