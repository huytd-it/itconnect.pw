import {Component, OnInit} from '@angular/core';
import {Job} from "../../../../models/job.model";
import {JobService} from "../../../../services/job.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AppService} from "../../../../services/app.service";
import {finalize} from "rxjs";
import {JobApplyService} from "../../../../services/job-apply.service";
import * as moment from "moment";
import {AppPermission} from 'src/app/models/permission.model';
import {PermissionService} from "../../../../services/permission.service";
import {JobSavedService} from "../../../../services/job-saved.service";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  data: Job;
  isJobModule: boolean;

  readonly AppPermission = AppPermission;

  get hasApply() {
    return moment().startOf('date').isSameOrBefore(this.data.endDate) &&
      this.permissionService.hasPermission(AppPermission.JOB_APPLY_CREATE);
  }

  constructor(
    private jobService: JobService,
    public appService: AppService,
    private route: ActivatedRoute,
    private router: Router,
    private jobApplyService: JobApplyService,
    private jobSavedService: JobSavedService,
    private permissionService: PermissionService
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

  apply() {
    this.appService.setHeadLoading(true);
    this.jobApplyService.create({ jobId: this.data.id })
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.data.jobApplySelf = 1;
        this.data.jobApplyCount++;
      })
  }

  save() {
    this.appService.setHeadLoading(true);
    if (this.data.jobSavedSelf) {
      this.jobSavedService.deleteByJobId(this.data.id)
        .pipe(finalize(() => this.appService.setHeadLoading(false)))
        .subscribe(data => {
          this.data.jobSavedSelf = 0;
        })
    } else {
      this.jobSavedService.create({ jobId: this.data.id })
        .pipe(finalize(() => this.appService.setHeadLoading(false)))
        .subscribe(data => {
          this.data.jobSavedSelf = 1;
        })
    }
  }
}
