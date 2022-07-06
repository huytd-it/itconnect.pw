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
import {UserService} from "../../../../../services/user.service";
import {UserBanStsInput, UserStsInput} from "../../../../../models/user.model";

@Component({
  selector: 'app-chart-user',
  templateUrl: './chart-user.component.html',
  styleUrls: ['./chart-user.component.scss']
})
export class ChartUserComponent implements OnInit, OnChanges {
  @Input() start: Date | undefined;
  @Input() end: Date | undefined;
  @Input() group: StatisticGroupBy;
  data: (UserStsInput & UserBanStsInput)[];
  config: AmchartLineConfig[] = [
    {
      name: 'Tài khoản',
      field: 'countAllUser',
      stroke: '#9a9a9a',
      strokeDasharray: [2, 2]
    },
    {
      name: 'Người dùng',
      field: 'countUser',
      stroke: '#7786c9'
    },
    {
      name: 'Công ty',
      field: 'countCompany',
      stroke: '#374b8d',
    },
    {
      name: 'Người dùng bị cấm',
      field: 'countBanUser',
      stroke: '#ce5e9a',
    },
    {
      name: 'Công ty bị cấm',
      field: 'countBanCompany',
      stroke: '#c94d4d',
    }
  ]

  constructor(
    private userService: UserService,
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
      this.userService.sts(option),
      this.userService.stsBan(option),
    ])
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(([dataUserLog, dataUserBanLog]) => {
        this.data = <any>mergeStatistic(
          this.group,
          this.userService.formatSts(dataUserLog),
          this.userService.formatStsBan(dataUserBanLog),
        );
      })
  }

  onGroup() {
    this.load();
  }
}
