import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AmchartLineConfig} from "../../../../../models/common";

@Component({
  selector: 'app-card-sts',
  templateUrl: './card-sts.component.html',
  styleUrls: ['./card-sts.component.scss']
})
export class CardStsComponent implements OnInit, OnChanges {
  @Input() config: AmchartLineConfig[];
  @Input() data: any[];
  hashingTotal: { [key: string] : number } = {};

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
    this.data.forEach(item => {
      this.config.forEach(cf => {
        if (!this.hashingTotal[cf.field]) {
          this.hashingTotal[cf.field] = 0;
        }
        this.hashingTotal[cf.field] += item[cf.field];
      })
    })
  }
}
