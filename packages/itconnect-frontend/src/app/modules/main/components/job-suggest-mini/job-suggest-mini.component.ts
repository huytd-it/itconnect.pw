import { Component, OnInit } from '@angular/core';
import {Job} from "../../../../models/job.model";
import {PointJobUserService} from "../../../../services/point-job-user.service";
import {PointJobUserSearchInput} from "../../../../models/point-job-user.model";
import {AppService} from "../../../../services/app.service";
import {finalize} from "rxjs";

@Component({
  selector: 'app-job-suggest-mini',
  templateUrl: './job-suggest-mini.component.html',
  styleUrls: ['./job-suggest-mini.component.scss']
})
export class JobSuggestMiniComponent implements OnInit {
  data: PointJobUserSearchInput;

  constructor(
    private pointJobUserService: PointJobUserService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.load())
  }

  private load() {
    this.appService.setHeadLoading(true);
    this.pointJobUserService.search({
      order: 'DESC',
      order_field: 'pju.pointTotal',
      take: 5,
      page: 1
    })
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.data = data;
      })
  }
}
