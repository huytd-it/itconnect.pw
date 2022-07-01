import {Component, OnInit} from '@angular/core';
import {MenuItem} from "../../../models/common";
import {AppPermission} from "../../../models/permission.model";
import {ActivatedRoute, Router} from "@angular/router";
import {PermissionService} from "../../../services/permission.service";

@Component({
  template: `
  `,
  selector: 'app-jobs-redirect'
})
export class RedirectComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private permissionService: PermissionService
  ) {
  }

  ngOnInit(): void {
    if (this.router.url.endsWith('/u/jobs')) {
      let p: string[] = [];
      if (this.permissionService.hasPermission(AppPermission.JOB_SUGGEST)) {
        p = ['suggest'];
      } else if (this.permissionService.hasPermission(AppPermission.JOB_CE)) {
        p = ['owner'];
      }
      this.router.navigate(p, { relativeTo: this.route }).then(() => {});
    }
  }
}
