import {Component, OnInit} from '@angular/core';
import {JobApplyService} from "../../../../services/job-apply.service";
import {AppService} from "../../../../services/app.service";
import {finalize} from "rxjs";
import {JobApply, JobApplySearchInput, JobApplyStatus} from "../../../../models/job-apply.model";
import {PageEvent} from "@angular/material/paginator";
import {AppPermission} from 'src/app/models/permission.model';
import * as moment from "moment";

@Component({
  selector: 'app-job-apply',
  templateUrl: './job-apply.component.html',
  styleUrls: ['./job-apply.component.scss']
})
export class JobApplyComponent implements OnInit {
  orderField = [
    {
      id: 1,
      name: 'Ngày Thêm',
      value: 'jobApply.createdAt',
    },
    {
      id: 2,
      name: 'Tên công việc',
      value: 'job.name'
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
  orderSelected = this.order[1];
  orderFieldSelected = this.orderField[0];

  search: string;
  data: JobApplySearchInput;
  readonly AppPermission = AppPermission;
  readonly JobApplyStatus = JobApplyStatus;

  constructor(
    private jobApplyService: JobApplyService,
    public appService: AppService
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.load());
  }

  checkPublish(item: JobApply) {
    return moment(item.job.endDate).isSameOrAfter(moment());
  }

  load(page: number = 1, take: number = 10) {
    this.appService.setHeadLoading(true);
    this.jobApplyService.search({
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

  onAccept(item: JobApply) {
    this.appService.setHeadLoading(true);
    this.jobApplyService.create({
      id: item.id,
      status: JobApplyStatus.RequestAccept
    })
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        const index = this.data.data.findIndex(it => it.id === item.id);
        this.data.data[index].status = JobApplyStatus.RequestAccept;
        this.data = {...this.data};
      })
  }

  onDenide(item: JobApply) {
    this.appService.setHeadLoading(true);
    this.jobApplyService.create({
      id: item.id,
      status: JobApplyStatus.RequestDenide
    })
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        const index = this.data.data.findIndex(it => it.id === item.id);
        this.data.data[index].status = JobApplyStatus.RequestDenide;
        this.data = {...this.data};
      })
  }
}
