import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../../services/auth.service";
import {AppRole} from "../../../../../models/permission.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  get slugAvatar() {
    if (this.authService.isRole(AppRole.Company)) {
      return this.authService.data?.user?.companyInfo?.avatar?.slug;
    }

    if (this.authService.isRole(AppRole.User)) {
      return this.authService.data?.user?.userInfo?.avatar?.slug;
    }

    return undefined;
  };

  get slugBanner() {
    if (this.authService.isRole(AppRole.Company)) {
      return this.authService.data?.user?.companyInfo?.banner?.slug;
    }

    if (this.authService.isRole(AppRole.User)) {
      return this.authService.data?.user?.userInfo?.banner?.slug;
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

    return (this.authService.data?.user?.userInfo?.fullName || this.authService.data?.user?.email) || 'N/A';
  }

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

}
