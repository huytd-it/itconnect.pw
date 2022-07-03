import { Component, Input, OnInit } from '@angular/core';
import {AppService} from "./../../../../../services/app.service";
import {AuthService} from "./../../../../../services/auth.service";
import {ProfileService} from "./../../../../../services/profile.service";
import {User} from "../../../../../models/user.model";

@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.component.html',
  styleUrls: ['./profile-company.component.scss']
})
export class ProfileCompanyComponent implements OnInit {
  @Input() user: User;

  get avatar() {
    return this.user.companyInfo.avatar?.slug;
  }

  get banner() {
    return this.user.companyInfo.banner?.slug;
  }

  get userName() {
    return this.user.companyInfo.companyName;
  }

  constructor(
    private appService: AppService,
    private authService: AuthService,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
  }
}
