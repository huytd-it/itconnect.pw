import { Component, OnInit } from '@angular/core';
import {JobApplyService} from "../../../../services/job-apply.service";
import {AppService} from "../../../../services/app.service";
import {finalize} from "rxjs";
import {JobApply, JobApplySearchInput} from "../../../../models/job-apply.model";
import {PageEvent} from "@angular/material/paginator";
import { AppPermission } from 'src/app/models/permission.model';
import {JobSavedService} from "../../../../services/job-saved.service";
import {JobSavedSearchInput} from "../../../../models/job-saved.model";

@Component({
  selector: 'app-job-saved',
  templateUrl: './job-saved.component.html',
  styleUrls: ['./job-saved.component.scss']
})
export class JobSavedComponent implements OnInit {
  orderField = [
    {
      id: 1,
      name: 'Ngày Thêm',
      value: 'jobSaved.createdAt',
    },
    {
      id: 2,
      name: 'Tên công việc',
      value: 'job.name'
    },
  ]
  orderFieldSelected = this.orderField[0];

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

  search: string;
  data: JobSavedSearchInput;
  readonly AppPermission = AppPermission;

  constructor(
    private jobSavedService: JobSavedService,
    public appService: AppService
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.load());
  }

  load(page: number = 1, take: number = 10) {
    this.appService.setHeadLoading(true);
    this.jobSavedService.search({
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
    this.jobSavedService.delete(item.id)
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.data.data = this.data.data.filter(it => it.id != item.id);
        this.data.meta.itemCount--;
      })
  }
}
