import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AppService} from "../../../../../services/app.service";
import * as moment from "moment";
import {
  AmchartLineConfig,
  EStatisticOptions,
  getStatisticOptions, mergeStatistic,
  StatisticGroupBy,
  StatisticOptions, StatisticOutput
} from "../../../../../models/common";
import {finalize, forkJoin} from "rxjs";
import {JobViewLogStsInput} from "../../../../../models/job-view-log.model";
import * as _ from "lodash";
import {JobApplyService} from "../../../../../services/job-apply.service";
import {JobApplyStsInput} from "../../../../../models/job-apply.model";
import {JobSavedStsInput} from "../../../../../models/job-saved.model";
import {JobService} from "../../../../../services/job.service";

@Component({
  selector: 'app-chart-job-ov',
  templateUrl: './chart-job-ov.component.html',
  styleUrls: ['./chart-job-ov.component.scss']
})
export class ChartJobOvComponent implements OnInit, OnChanges {
  @Input() start: Date | undefined;
  @Input() end: Date | undefined;
  @Input() group: StatisticGroupBy;
  data: (JobViewLogStsInput & JobApplyStsInput & JobSavedStsInput)[];
  config: AmchartLineConfig[] = [
    {
      name: 'Công việc mới',
      field: 'countJob',
      stroke: '#76f86c',
      strokeDasharray: [2, 2]
    },
    {
      name: 'Lưu nháp',
      field: 'countJobDraft',
      stroke: '#9a9a9a',
    },
    {
      name: 'Đợi xét duyệt',
      field: 'countJobWaitApprove',
      stroke: '#7786c9'
    },
    {
      name: 'Công khai',
      field: 'countJobPublish',
      stroke: '#3a8d37',
    },
    {
      name: 'Kết thúc',
      field: 'countJobEnd',
      stroke: '#f1984d',
    },
    {
      name: 'Bị cấm',
      field: 'countJobBan',
      stroke: '#c94d8f',
    }
  ]

  constructor(
    private jobService: JobService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => this.load());
  }

  load() {
    const option: StatisticOutput = {
      start: this.start,
      end: this.end,
      group: this.group
    };
    this.appService.setHeadLoading(true);
    forkJoin([
      this.jobService.sts1(option),
      this.jobService.sts2(option),
      this.jobService.sts3(option),
    ])
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(([s1, s2, s3]) => {
        this.data = <any>mergeStatistic(
          this.group,
          this.jobService.formatSts1(s1),
          this.jobService.formatSts2(s2),
          this.jobService.formatSts3(s3),
        );
      })
  }

  onGroup() {
    this.load();
  }
}
