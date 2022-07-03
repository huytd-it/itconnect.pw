import { Component, OnInit } from '@angular/core';
import {JobApply, JobApplySearchInput} from "../../../../../models/job-apply.model";
import {JobApplyService} from "../../../../../services/job-apply.service";
import {AppService} from "../../../../../services/app.service";
import {finalize} from "rxjs";
import {PageEvent} from "@angular/material/paginator";
import { AppPermission } from 'src/app/models/permission.model';
import {JobService} from "../../../../../services/job.service";
import {Job, JobSearchBodyOutput, JobSearchInput, JobSearchOutput, JobStatus} from "../../../../../models/job.model";

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.scss']
})
export class ApproveComponent implements OnInit {
  orderField = [
    {
      id: 1,
      name: 'Thời gian',
      value: 'job.createdAt',
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
  data: JobSearchInput;

  constructor(
    private jobService: JobService,
    public appService: AppService
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.load());
  }

  load(page: number = 1, take: number = 10) {
    const query: JobSearchOutput = {
      search: this.search,
      order_field: this.orderFieldSelected.value,
      order: <any>this.orderSelected.value,
      page,
      take
    }
    const body: Partial<JobSearchBodyOutput> = {
      status: JobStatus.WaitApprove
    }
    this.appService.setHeadLoading(true);
    this.jobService.search(query, body)
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
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

  approve(job: Job) {
    this.appService.setHeadLoading(true);
    this.jobService.approve(job.id)
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.data.data = this.data.data.filter(item => item.id != job.id)
      })
  }

  ban(job: Job) {
    this.appService.setHeadLoading(true);
    this.jobService.ban(job.id)
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.data.data = this.data.data.filter(item => item.id != job.id)
      })
  }
}
