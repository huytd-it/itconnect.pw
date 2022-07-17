import {Component, Input, OnInit} from '@angular/core';
import {AppPermission} from 'src/app/models/permission.model';
import {JobApply, JobApplySearchInput, JobApplySearchOutput, JobApplyStatus} from "../../../../models/job-apply.model";
import {JobApplyService} from "../../../../services/job-apply.service";
import {AppService} from "../../../../services/app.service";
import {ActivatedRoute} from "@angular/router";
import {finalize} from "rxjs";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-job-apply-company',
  templateUrl: './job-apply-company.component.html',
  styleUrls: ['./job-apply-company.component.scss']
})
export class JobApplyCompanyComponent implements OnInit {
  @Input() jobId: number;

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
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.load()
    })
  }

  load(page: number = 1, take: number = 10) {
    let option: JobApplySearchOutput = {
      search: this.search,
      order_field: this.orderFieldSelected.value,
      order: <any>this.orderSelected.value,
      page,
      take
    }
    if (this.jobId) {
      option.jobId = this.jobId;
    }
    this.appService.setHeadLoading(true);
    this.jobApplyService.search(option).pipe(finalize(() => this.appService.setHeadLoading(false)))
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

  onAcceptLink(item: JobApply) {
    this.onEdit(item, JobApplyStatus.RequestJoin)
  }

  onRequestInterview(item: JobApply) {
    this.onEdit(item, JobApplyStatus.RequestInterview);
  }

  onDenide(item: JobApply) {
    this.onEdit(item, JobApplyStatus.Denide);
  }

  private onEdit(item: JobApply, status: JobApplyStatus) {
    this.appService.setHeadLoading(true);
    this.jobApplyService.create({
      id: item.id,
      status
    })
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        const index = this.data.data.findIndex(it => it.id === item.id);
        this.data.data[index].status = status;
        this.data = {...this.data};
      })
  }
}
