import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import * as _ from "lodash";
import {AppService} from "./../../../../../services/app.service";
import {CvEducation} from "./../../../../../models/cv-education.model";

@Component({
  selector: 'app-education-item',
  templateUrl: './education-item.component.html',
  styleUrls: ['./education-item.component.scss']
})
export class EducationItemComponent implements OnInit, OnChanges {
  @Input() data: CvEducation;

  constructor(
    private appService: AppService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const {data} = changes;
    if (data && data.currentValue && !_.isEqual(data.currentValue, data.previousValue)) {
    }
  }
}
