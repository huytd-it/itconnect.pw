import { Component, OnInit } from '@angular/core';
import {JobApplyService} from "../../../../../services/job-apply.service";
import {AppService} from "../../../../../services/app.service";
import {finalize} from "rxjs";
import {JobApply, JobApplySearchInput, JobApplyStatus} from "../../../../../models/job-apply.model";
import {PageEvent} from "@angular/material/paginator";
import { AppPermission } from 'src/app/models/permission.model';
import {ActivatedRoute} from "@angular/router";
import {UserInfo} from "../../../../../models/user.model";
import {PeopleService} from "../../../../../services/people.service";
import * as moment from "moment";

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {
  orderField = [
    {
      id: 1,
      name: 'Ngày ứng tuyển',
      value: 'jobApply.createdAt',
    },
    {
      id: 2,
      name: 'Tên',
      value: 'userInfo.fullName'
    },
  ]
  order = [
    {
      id: 1,
      name: 'Tăng dần',
      value: 'ASC',
    },
    {
      id: 2,
      name: 'Giảm dần',
      value: 'DESC'
    },
  ]

  jobId: number;
  orderSelected = this.order[1];
  orderFieldSelected = this.orderField[0];
  search: string;
  data: JobApplySearchInput;
  readonly AppPermission = AppPermission;
  readonly JobApplyStatus = JobApplyStatus;

  constructor(
    private jobApplyService: JobApplyService,
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

  checkPublish(item: JobApply) {
    return moment(item.job.endDate).isSameOrAfter(moment());
  }

  load(page: number = 1, take: number = 10) {
    this.appService.setHeadLoading(true);
    this.jobApplyService.search({
      jobId: this.jobId,
      search: this.search,
      order_field: this.orderFieldSelected.value,
      order: <any>this.orderSelected.value,
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

  onCancel(item: JobApply) {
    this.appService.setHeadLoading(true);
    this.jobApplyService.delete(item.id)
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.data.data = this.data.data.filter(it => it.id != item.id);
        this.data.meta.itemCount--;
      })
  }

  getYoe(item: UserInfo) {
    return this.peopleService.getYoe(item);
  }


  onAccept(item: JobApply) {
    this.appService.setHeadLoading(true);
    this.jobApplyService.create({
      id: item.id,
      status: JobApplyStatus.RequestJoin
    })
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        const index = this.data.data.findIndex(it => it.id === item.id);
        this.data.data[index].status = JobApplyStatus.RequestJoin;
        this.data = {...this.data};
      })
  }

  onDenide(item: JobApply) {
    this.appService.setHeadLoading(true);
    this.jobApplyService.create({
      id: item.id,
      status: JobApplyStatus.Denide
    })
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        const index = this.data.data.findIndex(it => it.id === item.id);
        this.data.data[index].status = JobApplyStatus.Denide;
        this.data = {...this.data};
      })
  }
}
