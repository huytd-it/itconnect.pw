import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {JobViewLogService} from "../../../../../services/job-view-log.service";
import {AppService} from "../../../../../services/app.service";
import * as moment from "moment";
import {
  AmchartLineConfig,
  EStatisticOptions,
  getStatisticOptions, mergeStatistic,
  StatisticGroupBy,
  StatisticOptions
} from "../../../../../models/common";
import {finalize, forkJoin} from "rxjs";
import {JobViewLogStsInput} from "../../../../../models/job-view-log.model";
import * as _ from "lodash";
import {JobApplyService} from "../../../../../services/job-apply.service";
import {JobApplyStsInput} from "../../../../../models/job-apply.model";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() jobId: number;
  data: (JobViewLogStsInput & JobApplyStsInput)[];
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
      stroke: '#2f752c',
    }
  ]
  groups = _.cloneDeep(StatisticOptions);
  groupSelected: { value: EStatisticOptions } = this.groups[0];

  constructor(
    private jobViewLogService: JobViewLogService,
    private jobApplyService: JobApplyService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { jobId } = changes;
    if (jobId && jobId.currentValue && jobId.currentValue != jobId.previousValue) {
      setTimeout(() => this.load());
    }
  }

  load() {
    const o = getStatisticOptions(this.groupSelected.value);
    const option = {
      ...o,
      jobId: this.jobId
    };
    this.appService.setHeadLoading(true);
    forkJoin([
      this.jobViewLogService.sts(option),
      this.jobApplyService.sts(option),
    ])
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(([dataViewLog, dataApplyLog]) => {
        this.data = <any>mergeStatistic(
          this.jobViewLogService.formatSts(dataViewLog),
          this.jobApplyService.formatSts(dataApplyLog)
        );
      })
  }

  onGroup() {
    this.load();
  }
}
