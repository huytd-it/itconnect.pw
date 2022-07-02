import {Component, Input, OnInit} from '@angular/core';
import {AppService} from "./../../../../../services/app.service";
import {AuthService} from "./../../../../../services/auth.service";
import {User, UserInfo} from "../../../../../models/user.model";
import {ProfileService} from "../../../../../services/profile.service";
import {UserService} from "../../../../../services/user.service";
import {PeopleService} from "../../../../../services/people.service";

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {
  @Input() user: User;

  get yoe() {
    return this.peopleService.getYoe(this.user.userInfo);
  };

  get userInfo() {
    return this.user.userInfo;
  }


  get avatar() {
    return this.userInfo.avatar?.slug;
  }

  get banner() {
    return this.userInfo.banner?.slug;
  }

  get userName() {
    return this.userInfo.fullName;
  }

  constructor(
    private appService: AppService,
    private authService: AuthService,
    private peopleService: PeopleService
  ) { }

  ngOnInit(): void {
  }
}
