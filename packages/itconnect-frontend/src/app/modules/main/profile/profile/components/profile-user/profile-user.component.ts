import { Component, OnInit } from '@angular/core';
import {CreateTaggedOutput, SearchPageOutput, TaggedInput} from "../../../../../../models/common";
import {PositionService} from "../../../../../../services/position.service";
import {UserPositionService} from "../../../../../../services/user-position.service";
import {AppService} from "../../../../../../services/app.service";
import {UserPosition} from "../../../../../../models/user-position.model";
import {finalize} from "rxjs";
import * as _ from "lodash";
import {UserSkill} from "../../../../../../models/user-skill.model";
import {SkillService} from "../../../../../../services/skill.service";
import {UserSkillService} from "../../../../../../services/user-skill.service";
import {AppPermission} from "../../../../../../models/permission.model";
import {AuthService} from "../../../../../../services/auth.service";
import {ProfileService} from "../../../../../../services/profile.service";
import * as moment from "moment";
import {File} from "../../../../../../models/file.model";

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {
  userPosition: UserPosition[];
  userSkill: UserSkill[];
  yoe: string;

  readonly permission = AppPermission;

  get avatar() {
    return this.authService.data?.user.userInfo.avatar?.slug;
  }

  get banner() {
    return this.authService.data?.user.userInfo.banner?.slug;
  }

  get userName() {
    return this.authService.data?.user.userInfo.fullName;
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
    this.firstLoad();
    this.loadYoe();
  }

  firstLoad() {
    let flag = 2;
    this.appService.setHeadLoading(true);
    this.userPositionService.getAll()
      .pipe(finalize(() => !--flag && this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.userPosition = this.userPositionService.formatDataToTagged(data);
      })
    this.userSkillService.getAll()
      .pipe(finalize(() => !--flag && this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.userSkill = this.userSkillService.formatDataToTagged(data);
      })
  }

  fetchDataPosition = (query: SearchPageOutput) => {
    return this.positionService.search(query);
  }

  createTagPosition = (data: CreateTaggedOutput) => {
    return this.positionService.createTag(data);
  }

  onAddUserPosition(e: TaggedInput) {
    this.appService.setHeadLoading(true);
    this.userPositionService.createOrEdit({
      position: e.id,
      level: 1
    })
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.userPosition.push(this.userPositionService.formatDataToTagged([data])[0])
      })
  }

  onRemoveUserPosition(e: UserPosition) {
    this.appService.setHeadLoading(true);
    this.userPositionService.delete(e.id)
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.userPosition = this.userPosition.filter(item => item.id != e.id)
      })
  }

  onChangeUserPosition = _.debounce((e: UserPosition) => {
    this.appService.setHeadLoading(true);
    this.userPositionService.createOrEdit({
      id: e.id,
      level: e.level
    })
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
      })
  }, 300) as any;


  fetchDataSkill = (query: SearchPageOutput) => {
    return this.skillService.search(query);
  }

  createTagSkill = (data: CreateTaggedOutput) => {
    return this.skillService.createTag(data);
  }

  onAddUserSkill(e: TaggedInput) {
    this.appService.setHeadLoading(true);
    this.userSkillService.createOrEdit({
      skill: e.id,
      level: 1
    })
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.userSkill.push(this.userSkillService.formatDataToTagged([data])[0])
      })
  }

  onRemoveUserSkill(e: UserSkill) {
    this.appService.setHeadLoading(true);
    this.userSkillService.delete(e.id)
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.userSkill = this.userSkill.filter(item => item.id != e.id)
      })
  }

  onChangeUserSkill = _.debounce((e: UserSkill) => {
    this.appService.setHeadLoading(true);
    this.userSkillService.createOrEdit({
      id: e.id,
      level: e.level
    })
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
      })
  }, 300) as any;


  loadYoe() {
    this.profileService.yoe().subscribe(data => {
      let add = 0;
      if (data.computeYoeCurrent) {
        add = moment().diff(moment(data.computeYoeDate).startOf('month'), 'month')
      }
      let yoe = data.computeYoe + add;
      this.yoe = this.yoeToString(yoe);
    })
  }

  yoeToString(yoe: number) {
    let str = "";

    yoe = yoe / 12;
    if (yoe >= 1) {
      str = `${Math.floor(yoe)} năm`;
      yoe = Math.round(yoe - Math.floor(yoe));
      if (yoe > 0) {
        str += ` ${yoe} tháng`;
      }
    } else {
      str = Math.round(yoe * 12) + ' tháng';
    }

    return str;
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
