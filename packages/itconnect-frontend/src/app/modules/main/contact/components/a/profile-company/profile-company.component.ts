import { Component, OnInit } from '@angular/core';
import {UserPosition} from "../../../../../../models/user-position.model";
import {UserSkill} from "../../../../../../models/user-skill.model";
import {AppPermission} from "../../../../../../models/permission.model";
import {PositionService} from "../../../../../../services/position.service";
import {UserPositionService} from "../../../../../../services/user-position.service";
import {SkillService} from "../../../../../../services/skill.service";
import {UserSkillService} from "../../../../../../services/user-skill.service";
import {AppService} from "../../../../../../services/app.service";
import {AuthService} from "../../../../../../services/auth.service";
import {ProfileService} from "../../../../../../services/profile.service";
import {finalize} from "rxjs";
import {CreateTaggedOutput, SearchPageOutput, TaggedInput} from "../../../../../../models/common";
import * as _ from "lodash";
import * as moment from "moment";
import {File} from "../../../../../../models/file.model";

@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.component.html',
  styleUrls: ['./profile-company.component.scss']
})
export class ProfileCompanyComponent implements OnInit {
  readonly permission = AppPermission;

  get avatar() {
    return this.authService.data?.user.companyInfo.avatar?.slug;
  }

  get banner() {
    return this.authService.data?.user.companyInfo.banner?.slug;
  }

  get userName() {
    return this.authService.data?.user.companyInfo.companyName;
  }

  constructor(
    private positionService: PositionService,
    private userPositionService: UserPositionService,
    private skillService: SkillService,
    private userSkillService: UserSkillService,
    private appService: AppService,
    private authService: AuthService,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
  }


  onChangeAvatar(e: File) {
    this.appService.setHeadLoading(true);
    this.profileService.setAvatarBanner({ avatar: e.id })
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.authService.preLoadUser();
      })
  }

  onChangeBanner(e: File) {
    this.appService.setHeadLoading(true);
    this.profileService.setAvatarBanner({ banner: e.id })
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.authService.preLoadUser();
      })
  }

}
