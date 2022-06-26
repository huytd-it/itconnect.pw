import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppService} from "../../../../../../services/app.service";
import {JobService} from "../../../../../../services/job.service";
import {finalize} from "rxjs";
import {Job} from "../../../../../../models/job.model";

@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.scss']
})
export class ViewJobComponent implements OnInit {
  data: Job;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.loadJob(data['id']);
    })
  }

  loadJob(id: number) {
    this.appService.setHeadLoading(true);
    this.jobService.getById(id)
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.data = data;
      })
  }
}
