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
      },
      {
        name: "Công ty",
        class: 'apartment',
        link: '/u/admin/company',
        permission: AppPermission.ADMIN
      },
      {
        name: "Trường học",
        class: 'school',
        link: '/u/admin/tag/school',
        permission: AppPermission.ADMIN
      },
      {
        name: "Văn bằng / chứng chỉ",
        class: 'card_membership',
        link: '/u/admin/tag/certificate',
        permission: AppPermission.ADMIN
      },
      {
        name: "Vị trí công việc",
        class: 'groups',
        link: '/u/admin/tag/position',
        permission: AppPermission.ADMIN
      },
      {
        name: "Kỹ năng công việc",
        class: 'hub',
        link: '/u/admin/tag/skill',
        permission: AppPermission.ADMIN
      },
      {
        name: "Loại công việc",
        class: 'hail',
        link: '/u/admin/tag/job-type',
        permission: AppPermission.ADMIN
      },
      {
        name: "Trình độ công việc",
        class: 'schedule',
        link: '/u/admin/tag/job-type',
        permission: AppPermission.ADMIN
      },
      {
        name: "Hình thức làm việc",
        class: 'psychology_alt',
        link: '/u/admin/tag/work-from',
        permission: AppPermission.ADMIN
      },
      {
        name: "Cấu hình auto mapping",
        class: 'auto_graph',
        link: '/u/admin/auto-mapping',
        permission: AppPermission.ADMIN
      }
    ]
  }
}
