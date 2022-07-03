import {Component, OnInit, ViewChild} from '@angular/core';
import {AppService} from "../../../../services/app.service";
import {JobService} from "../../../../services/job.service";
import {ActivatedRoute, Router} from "@angular/router";
import {finalize} from "rxjs";
import {Job, JobStatus} from "../../../../models/job.model";
import {MatTabGroup} from "@angular/material/tabs";
import * as _ from "lodash";
import * as moment from "moment";
import {NotifyService} from "../../../../services/notify.service";

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  @ViewChild('tabGroup') tabGroup: MatTabGroup;
  data: Job;

  readonly JobStatus = JobStatus;

  get isEnded() {
    return moment().isAfter(moment(this.data.endDate));
  }

  constructor(
    private jobService: JobService,
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router,
    private notify: NotifyService
  ) {
    this.route.params.subscribe(params => {
      this.loadJob(params['id']);
    })

    // auto next tab
    this.route.url.subscribe(data => {
      setTimeout(() => {
        const url = this.router.url;
        if (url.match(/\/jobs\/manage\/[0-9]+\/apply/gmi)) {
          this.tabGroup.selectedIndex = 1;
        } else if (url.match(/\/jobs\/manage\/[0-9]+\/suggest/gmi)) {
          this.tabGroup.selectedIndex = 2;
        } else {
          this.tabGroup.selectedIndex = 0;
        }
      })
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
        path = ['apply'];
        break;
      case 2:
        path = ['suggest'];
        break;
    }
    this.router.navigate(path, { relativeTo: this.route }).then(() => {})
  }

  publish() {
    this.appService.setHeadLoading(true);
    this.jobService.publish(this.data.id)
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(() => {
        this.loadJob(this.data.id);
      })
  }

  stop() {
    this.appService.setHeadLoading(true);
    this.jobService.stop(this.data.id)
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(() => {
        this.loadJob(this.data.id);
      })
  }

  delete() {
    this.appService.setHeadLoading(true);
    this.jobService.delete(this.data.id)
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(() => {
        this.notify.success('Công việc', `Đã xóa thành công ${this.data.name}`);
        this.router.navigate(['/u/jobs/owner']).then(() => {})
      })
  }
}
