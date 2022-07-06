import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AmchartLineConfig, StatisticGroupBy} from "../../../../../models/common";

@Component({
  selector: 'app-card-sts',
  templateUrl: './card-sts.component.html',
  styleUrls: ['./card-sts.component.scss']
})
export class CardStsComponent implements OnInit, OnChanges {
  @Input() config: AmchartLineConfig[];
  @Input() data: any[];
  @Input() customData: { [key: string]: number };
  @Input() type: StatisticGroupBy;
  hashingTotal: { [key: string] : number } = {};
  hashingAvg: { [key: string] : string } = {};

  get typeString() {
    switch (this.type) {
      case StatisticGroupBy.Hour: return 'giờ';
      case StatisticGroupBy.Day: return 'ngày';
      case StatisticGroupBy.Month: return 'tháng';
      case StatisticGroupBy.Year: return 'năm';
    }
    return '--';
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => this.compute());
  }

  compute() {
    if (!this.config || !this.data) {
      return
    }
    this.hashingTotal = {};
    this.hashingAvg = {};
    this.data.forEach(item => {
      this.config.forEach(cf => {
        if (!this.hashingTotal[cf.field]) {
          this.hashingTotal[cf.field] = 0;
        }
        this.hashingTotal[cf.field] += item[cf.field];
      })
    })

    this.config.forEach(cf => {
      if (this.customData?.[cf.field]) {
        this.hashingTotal[cf.field] = this.customData[cf.field];
      }
      this.hashingAvg[cf.field] = ((this.customData?.[cf.field] || this.hashingTotal[cf.field]) / this.data.length).toFixed(2);
    })
  }
}
