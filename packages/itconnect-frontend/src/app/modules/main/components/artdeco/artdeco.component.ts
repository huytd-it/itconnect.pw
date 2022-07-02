import {Component, OnInit} from '@angular/core';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from "../../../../services/auth.service";
import {Router} from "@angular/router";
import {PermissionService} from "../../../../services/permission.service";
import {AppRole} from "../../../../models/permission.model";

@Component({
  selector: 'app-artdeco',
  templateUrl: './artdeco.component.html',
  styleUrls: ['./artdeco.component.scss']
})
export class ArtdecoComponent implements OnInit {
  faCaretDown = faCaretDown;
  isOpenDropdown: boolean;

  get slugAvatar() {
    if (this.authService.isRole(AppRole.Company)) {
      return this.authService.data?.user?.companyInfo?.avatar?.slug;
    }

    if (this.authService.isRole(AppRole.User)) {
      return this.authService.data?.user?.userInfo?.avatar?.slug;
    }

    return undefined;
  };

  get name() {
    if (this.authService.isRole(AppRole.Begin)) {
      return this.authService.data?.user.email || 'N/A';
    }

    if (this.authService.isRole(AppRole.Company)) {
      return this.authService.data?.user?.companyInfo?.companyName || 'N/A';
    }

    return this.authService.data?.user?.userInfo?.fullName || 'N/A';
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    public permission: PermissionService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']).then(() => {});
  }
}
