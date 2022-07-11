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
  typeList = [
    {
      name: 'Tất cả',
      value: 'all'
    },
    {
      name: 'Khoảng thời gian',
      value: 'date-range'
    },
  ]
  minDate: Date = moment().startOf('date').toDate();
  maxDate: Date = new Date();
  currentDate: Date = new Date();
  groupByList = _.cloneDeep(statisticGroupByList);
  groupBy: { value: StatisticGroupBy } = this.groupByList[0];
  typeSelected = this.typeList[1];

  minDateValid: Date | undefined = this.minDate;
  maxDateValid: Date | undefined = this.maxDate;

  constructor() { }

  ngOnInit(): void {
  }

  onChange() {
    const a = moment(this.minDate);
    const b = moment(this.maxDate);
    if (a.isValid() && b.isValid() && a.isSameOrBefore(b) && this.typeSelected.value == 'date-range') {
      this.minDateValid = a.startOf('date').toDate();
      this.maxDateValid = b.startOf('date').isSame(moment().startOf('date'))
        ? this.maxDate : b.endOf('date').toDate();
    }
  }

  onChangeType() {
    if (this.typeSelected.value == 'all') {
      this.minDateValid = undefined;
      this.maxDateValid = moment().toDate();
    } else {
      this.onChange();
    }
  }
}
