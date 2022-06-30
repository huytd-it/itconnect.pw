import { Component, OnInit } from '@angular/core';
import {JobApplySearchInput} from "../../../../models/job-apply.model";
import {JobApplyService} from "../../../../services/job-apply.service";
import {AppService} from "../../../../services/app.service";
import {finalize} from "rxjs";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-job-suggest',
  templateUrl: './job-suggest.component.html',
  styleUrls: ['./job-suggest.component.scss']
})
export class JobSuggestComponent implements OnInit {
  data: JobApplySearchInput;

  constructor(
    private jobApplyService: JobApplyService,
    public appService: AppService
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.load());
  }

  load(page: number = 1, take: number = 10) {
    this.appService.setHeadLoading(true);
    this.jobApplyService.search({
      page,
      take
    }).pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.data = data;
      })
  }

  onChangePage(e: PageEvent) {
    this.load(e.pageIndex + 1, e.pageSize);
  }

}
