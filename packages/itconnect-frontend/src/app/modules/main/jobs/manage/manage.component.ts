import { Component, OnInit } from '@angular/core';
import {AppService} from "../../../../services/app.service";
import {JobService} from "../../../../services/job.service";
import {ActivatedRoute, Router} from "@angular/router";
import {finalize} from "rxjs";
import {Job, JobStatus} from "../../../../models/job.model";

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  data: Job;

  constructor(
    private jobService: JobService,
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.params.subscribe(params => {
      this.loadJob(params['id']);
    })
  }

  ngOnInit(): void {
  }

  loadJob(id: number) {
    this.appService.setHeadLoading(true);
    this.jobService.getById(id)
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe((data) => {
        this.data = data;
      })
  }

  getStatusText(status: JobStatus) {
    return this.jobService.getStatusText(status);
  }
}
