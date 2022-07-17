import {Component, OnInit} from '@angular/core';
import {JobSearchInput, JobStatus} from "../../../../../models/job.model";
import {AppService} from "../../../../../services/app.service";
import {JobService} from "../../../../../services/job.service";
import {finalize} from "rxjs";

@Component({
  selector: 'app-job-trending',
  templateUrl: './job-trending.component.html',
  styleUrls: ['./job-trending.component.scss']
})
export class JobTrendingComponent implements OnInit {
  menu = [
    {
      name: 'Mới nhất',
      value: 'job.createdAt'
    },
    {
      name: 'Lượt xem',
      value: 'jobViewLogCount'
    },
    {
      name: 'Ứng tuyển',
      value: 'jobApplyCount'
    },
    {
      name: 'Quan tâm',
      value: 'jobSavedCount'
    },
  ]
  menuSelected = this.menu[0];
  data: JobSearchInput;

  constructor(
    private appService: AppService,
    private jobService: JobService
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.load())
  }

  onSelectTab(item: { value: string, name: string }) {
    this.menuSelected = item;
    this.load()
  }

  load() {
    this.appService.setHeadLoading(true);
    this.jobService.search({
      order: 'DESC',
      order_field: this.menuSelected.value,
    }, { status: JobStatus.Publish })
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.data = data;
      })
  }
}
