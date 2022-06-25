import { Component, OnInit } from '@angular/core';
import {MenuItem} from "../../../models/common";
import {AppPermission} from "../../../models/permission.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  menu: MenuItem[] = [];

  get menuActive() {
    return this.menu.find(item => {
      return this.router.url.endsWith(item.link);
    }) ?? { name: 'N/A', class: 'N/A' }
  }

  constructor(
    private router: Router,
  ) {
    this.menu = this.getMenu();
  }

  ngOnInit(): void {
  }

  private getMenu(): MenuItem[] {
    return [
      {
        name: "Tìm việc",
        class: 'icon-search',
        link: '/u/search/job',
        permission: AppPermission.JOB_SEARCH
      },
        {
        name: "Tạo việc làm",
        class: 'icon-new-message',
        link: 'create',
        permission: AppPermission.JOB_CE
      }
    ]
  }
}
