import {Component, OnInit} from '@angular/core';
import {MenuItem} from "../../../models/common";
import {AppPermission} from "../../../models/permission.model";
import {ActivatedRoute, Route, Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
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
        name: "Hồ sơ",
        class: 'account_circle',
        link: '',
        permission: AppPermission.PROFILE
      },
      {
        name: "Đăng xuất",
        class: 'logout',
        link: '/logout',
        permission: AppPermission.LOGOUT
      },
    ]
  }

}
