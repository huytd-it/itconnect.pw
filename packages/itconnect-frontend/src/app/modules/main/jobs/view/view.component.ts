import { Component, OnInit } from '@angular/core';
import {Job} from "../../../../models/job.model";
import {JobService} from "../../../../services/job.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AppService} from "../../../../services/app.service";
import {finalize} from "rxjs";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  data: Job;
  isJobModule: boolean;

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
    setTimeout(() => {
      this.isJobModule = !!this.router.url.match(/\/jobs\/view/)?.length;
    })
  }

  loadJob(id: number) {
    this.appService.setHeadLoading(true);
    this.jobService.getById(id)
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe((data) => {
        this.data = data;
      })
  }
}
