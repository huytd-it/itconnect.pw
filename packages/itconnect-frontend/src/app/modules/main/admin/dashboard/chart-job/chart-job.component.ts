import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {JobViewLogService} from "../../../../../services/job-view-log.service";
import {AppService} from "../../../../../services/app.service";
import {AmchartLineConfig, mergeStatistic, StatisticGroupBy, StatisticOutput} from "../../../../../models/common";
import {finalize, forkJoin} from "rxjs";
import {JobViewLogStsInput} from "../../../../../models/job-view-log.model";
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
  @Input() start: Date | undefined;
  @Input() end: Date | undefined;
  @Input() group: StatisticGroupBy;
  data: (JobViewLogStsInput & JobApplyStsInput & JobSavedStsInput)[];
  dataCustom: {[key: string]: number };
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
      name: 'Lượt ứng tuyển',
      field: 'countApply',
      stroke: '#3a8d37',
    },
    {
      name: 'Lượt yêu thích',
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

      // api only get unique view
      this.jobViewLogService.sts({
        ...option,
        group: StatisticGroupBy.Year
      }),
    ])
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(([dataViewLog, dataApplyLog, dataSavedLog, dataUniqueLog]) => {
        this.data = <any>mergeStatistic(
          this.group,
          this.jobViewLogService.formatSts(dataViewLog),
          this.jobApplyService.formatSts(dataApplyLog),
          this.jobSavedService.formatSts(dataSavedLog),
        );

        this.dataCustom = {
          countUnique: Number(dataUniqueLog?.[0]?.countUnique) || 0
        }
      })
  }

  onGroup() {
    this.load();
  }
}
