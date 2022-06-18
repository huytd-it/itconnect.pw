import { Component, OnInit } from '@angular/core';
import {MenuItem} from "../../../models/common";
import {AppPermission} from "../../../models/permission.model";

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  menu: MenuItem[];

  constructor() {
    this.menu = this.getMenu();
  }

  ngOnInit(): void {
  }

  private getMenu(): MenuItem[] {
    return [
      {
        name: "Tìm việc",
        class: 'icon-search',
        link: 'search',
        permission: AppPermission.JOB
      },
      {
        name: "Việc làm của tôi",
        class: 'icon-job',
        link: 'my',
        permission: AppPermission.JOB
      },
      {
        name: "Tạo việc làm",
        class: 'icon-new-message',
        link: 'create',
        permission: AppPermission.JOB_CREATE
      }
    ]
  }
}
