import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTabGroup} from "@angular/material/tabs";
import {Job, JobStatus} from "../../../../models/job.model";
import {JobService} from "../../../../services/job.service";
import {AppService} from "../../../../services/app.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NotifyService} from "../../../../services/notify.service";

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  @ViewChild('tabGroup') tabGroup: MatTabGroup;

  readonly JobStatus = JobStatus;


  constructor(
    private jobService: JobService,
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router,
    private notify: NotifyService
  ) {
    // auto next tab
    this.route.url.subscribe(data => {
      setTimeout(() => {
        const url = this.router.url;
        if (url.match(/\/admin\/jobs\/all/gmi)) {
          this.tabGroup.selectedIndex = 1;
        } else {
          this.tabGroup.selectedIndex = 0;
        }
      })
    })
  }

  ngOnInit(): void {
  }

  getStatusText(status: JobStatus) {
    return this.jobService.getStatusText(status);
  }

  gotoMain() {
    this.router.navigate([], { relativeTo: this.route }).then(() => {})
  }

  changeTab(e: number) {
    let path: string[] = [];
    switch (e) {
      case 0:
        path = ['./']
        break;

      case 1:
        path = ['all'];
        break;
    }
    this.router.navigate(path, { relativeTo: this.route }).then(() => {})
  }
}
