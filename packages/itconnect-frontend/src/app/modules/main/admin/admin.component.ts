import { Component, OnInit } from '@angular/core';
import {MenuItem} from "../../../models/common";
import {ActivatedRoute, Router} from "@angular/router";
import {PermissionService} from "../../../services/permission.service";
import {AppPermission} from "../../../models/permission.model";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  menu: MenuItem[] = [];

  get menuActive() {
    return this.menu.find(item => {
      return this.router.url.endsWith(item.link);
    }) ?? { name: 'N/A', class: 'N/A' }
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private permissionService: PermissionService
  ) {
    this.menu = this.getMenu();
  }

  ngOnInit(): void {
  }

  private getMenu(): MenuItem[] {
    return [
      {
        name: "Tổng quan",
        class: 'dashboard',
        link: '/u/admin/dashboard',
        permission: AppPermission.ADMIN
      },
      {
        name: "Công việc",
        class: 'work',
        link: '/u/admin/jobs',
        permission: AppPermission.ADMIN
      },
      {
        name: "Người dùng",
        class: 'person',
        link: '/u/admin/user',
        permission: AppPermission.ADMIN
      }
    ]
  }
}
