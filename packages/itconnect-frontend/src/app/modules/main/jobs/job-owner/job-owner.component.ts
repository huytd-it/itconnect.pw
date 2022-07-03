import {Component, OnInit} from '@angular/core';
import {JobService} from "../../../../services/job.service";
import {AppService} from "../../../../services/app.service";
import {Job, JobSearchBodyOutput, JobSearchInput, JobSearchOutput, JobStatus} from "../../../../models/job.model";
import {finalize} from "rxjs";
import {PageEvent} from "@angular/material/paginator";
import * as moment from "moment";

@Component({
  selector: 'app-job-owner',
  templateUrl: './job-owner.component.html',
  styleUrls: ['./job-owner.component.scss']
})
export class JobOwnerComponent implements OnInit {
  orderField = [
    {
      id: 1,
      name: 'Ngày Thêm',
      value: 'job.createdAt',
    },
    {
      id: 1,
      name: 'Ngày cập nhật',
      value: 'job.updatedAt',
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
  orderFieldSelected = this.orderField[0];
  orderSelected = this.order[1];
  query: JobSearchOutput = {};
  body: Partial<JobSearchBodyOutput> = {
    includeJobExpired: true
  }
  data: JobSearchInput;
  readonly JobStatus = JobStatus;

  constructor(
    private jobService: JobService,
    public appService: AppService
  ) {
  }

  ngOnInit(): void {
    setTimeout(() => this.onSearch());
  }

  onSearch(firstPage: boolean = true) {
    if (firstPage) {
      this.query.take = 10;
      this.query.page = 1;
    }
    this.query.order_field = this.orderFieldSelected.value;
    this.query.order = <any>this.orderSelected.value;

    this.appService.setHeadLoading(true);
    this.jobService.search(this.query, this.body)
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        document.body.scrollTop = 0;
        this.data = data;
      })
  }

  onChangePage(e: PageEvent) {
    this.query.page = e.pageIndex + 1;
    this.query.take = e.pageSize;
    this.onSearch(false);
  }

  getStatusText(status: JobStatus) {
    return this.jobService.getStatusText(status)
  }

  isEnded(item: Job) {
    return moment().isAfter(moment(item.endDate));
  }
}
