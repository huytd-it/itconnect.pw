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

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {
  userPosition: UserPosition[];
  userSkill: UserSkill[];

  readonly permission = AppPermission;

  constructor(
    private positionService: PositionService,
    private userPositionService: UserPositionService,
    private skillService: SkillService,
    private userSkillService: UserSkillService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.firstLoad().then(() => {});
  }

  async firstLoad() {
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
}
