import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {JobViewLogService} from "../../../../../services/job-view-log.service";
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
import {JobSavedService} from "../../../../../services/job-saved.service";
import {JobSavedStsInput} from "../../../../../models/job-saved.model";

@Component({
  selector: 'app-chart-job',
  templateUrl: './chart-job.component.html',
  styleUrls: ['./chart-job.component.scss']
})
export class ChartJobComponent implements OnInit, OnChanges {
  @Input() start: Date;
  @Input() end: Date;
  @Input() group: StatisticGroupBy;
  data: (JobViewLogStsInput & JobApplyStsInput & JobSavedStsInput)[];
  config: AmchartLineConfig[] = [
    {
      name: 'Lượt xem',
      field: 'countView',
      stroke: '#9a9a9a',
      strokeDasharray: [2, 2]
    },
    {
      name: 'Người xem',
      field: 'countUnique',
      stroke: '#7786c9'
    },
    {
      name: 'Người ứng tuyển',
      field: 'countApply',
      stroke: '#3a8d37',
    },
    {
      name: 'Người yêu thích',
      field: 'countSaved',
      stroke: '#c94d8f',
    }
  ]

  constructor(
    private jobViewLogService: JobViewLogService,
    private jobApplyService: JobApplyService,
    private jobSavedService: JobSavedService,
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
      this.jobViewLogService.sts(option),
      this.jobApplyService.sts(option),
      this.jobSavedService.sts(option),
    ])
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(([dataViewLog, dataApplyLog, dataSavedLog]) => {
        this.data = <any>mergeStatistic(
          this.jobViewLogService.formatSts(dataViewLog),
          this.jobApplyService.formatSts(dataApplyLog),
          this.jobSavedService.formatSts(dataSavedLog),
        );
      })
  }

  onGroup() {
    this.load();
  }
}
