import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {JobService} from "../../../../../services/job.service";
import {finalize} from "rxjs";
import {AppService} from "../../../../../services/app.service";
import {Job} from "../../../../../models/job.model";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnChanges {
  @Input() jobId: number;
  job: Job;

  constructor(
    private jobService: JobService,
    private appService: AppService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { jobId } = changes;
    if (jobId && jobId.currentValue && jobId.currentValue != jobId.previousValue) {
      setTimeout(() => this.loadJob())
    }
  }


  private loadJob() {
    const jobId = this.jobId;
    if (!jobId) {
      return;
    }
    this.appService.setHeadLoading(true);
    this.jobService.getById(jobId)
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.job = data;
      })
  }
}
