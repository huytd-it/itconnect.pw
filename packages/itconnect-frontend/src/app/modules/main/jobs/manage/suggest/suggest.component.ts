import { Component, OnInit } from '@angular/core';
import {JobApplyService} from "../../../../../services/job-apply.service";
import {AppService} from "../../../../../services/app.service";
import {finalize} from "rxjs";
import {JobApply, JobApplySearchInput} from "../../../../../models/job-apply.model";
import {PageEvent} from "@angular/material/paginator";
import { AppPermission } from 'src/app/models/permission.model';
import {ActivatedRoute} from "@angular/router";
import {UserInfo} from "../../../../../models/user.model";
import {PeopleService} from "../../../../../services/people.service";
import {PointJobUserSearchInput} from "../../../../../models/point-job-user.model";
import {PointJobUserService} from "../../../../../services/point-job-user.service";

@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.component.html',
  styleUrls: ['./suggest.component.scss']
})
export class SuggestComponent implements OnInit {
  jobId: number;
  search: string;
  data: PointJobUserSearchInput;
  readonly AppPermission = AppPermission;

  constructor(
    private pointJobUserService: PointJobUserService,
    public appService: AppService,
    private route: ActivatedRoute,
    private peopleService: PeopleService
  ) {
    const parent = this.route.parent?.parent;
    if (parent) {
      parent.params.subscribe(data => {
        this.jobId = Number(data['id']);
        this.load();
      })
    }
  }

  ngOnInit(): void {
  }

  load(page: number = 1, take: number = 10) {
    this.appService.setHeadLoading(true);
    this.pointJobUserService.search({
      jobId: this.jobId,
      search: this.search,
      order_field: 'pju.pointTotal',
      order: 'DESC',
      page,
      take
    }).pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.data = data;
      })
  }

  onSearch() {
    this.load();
  }

  onChangePage(e: PageEvent) {
    this.load(e.pageIndex + 1, e.pageSize);
  }

  getYoe(item: UserInfo) {
    return this.peopleService.getYoe(item);
  }
}
