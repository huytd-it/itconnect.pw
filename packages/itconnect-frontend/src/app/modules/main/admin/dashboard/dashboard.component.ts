import { Component, OnInit } from '@angular/core';
import * as _ from "lodash";
import {StatisticGroupBy, statisticGroupByList} from "../../../../models/common";
import * as moment from "moment";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  minDate: Date = moment().startOf('date').toDate();
  maxDate: Date = new Date();
  currentDate: Date = new Date();
  groupByList = _.cloneDeep(statisticGroupByList);
  groupBy: { value: StatisticGroupBy } = this.groupByList[0];


  constructor() { }

  ngOnInit(): void {
  }

  onChange() {

  }
}
