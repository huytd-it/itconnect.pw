import {Component, OnInit} from '@angular/core';
import {MenuItem} from "../../../models/common";
import {AppPermission} from "../../../models/permission.model";
import {ActivatedRoute, Router} from "@angular/router";
import {PermissionService} from "../../../services/permission.service";

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
        name: "Dành cho bạn",
        class: 'assistant',
        link: '/u/jobs/suggest',
        permission: AppPermission.JOB_SUGGEST
      },
      {
        name: "Tìm việc",
        class: 'search',
        link: '/u/search/job',
        permission: AppPermission.JOB_SEARCH
      },
      {
        name: "Công việc ứng tuyển",
        class: 'approval',
        link: '/u/jobs/apply',
        permission: AppPermission.JOB_APPLY
      },
      {
        name: "Công việc yêu thích",
        class: 'folder_special',
        link: '/u/jobs/saved',
        permission: AppPermission.JOB_SAVED
      },
      {
        name: "Công việc đã đăng",
        class: 'topic',
        link: '/u/jobs/owner',
        permission: AppPermission.JOB_CE
      },
      {
        name: "Tạo việc làm",
        class: 'add',
        link: 'create',
        permission: AppPermission.JOB_CE
      }
    ]
  }
}
