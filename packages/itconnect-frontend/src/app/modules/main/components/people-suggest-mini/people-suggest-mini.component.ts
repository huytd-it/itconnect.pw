import { Component, OnInit } from '@angular/core';
import {Job} from "../../../../models/job.model";
import {PointJobUserService} from "../../../../services/point-job-user.service";
import {PointJobUserSearchInput} from "../../../../models/point-job-user.model";
import {AppService} from "../../../../services/app.service";
import {finalize} from "rxjs";

@Component({
  selector: 'app-people-suggest-mini',
  templateUrl: './people-suggest-mini.component.html',
  styleUrls: ['./people-suggest-mini.component.scss']
})
export class PeopleSuggestMiniComponent implements OnInit {
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
      groupBy: 'pju.user.id',
      take: 5,
      page: 1
    })
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.data = data;
      })
  }
}
