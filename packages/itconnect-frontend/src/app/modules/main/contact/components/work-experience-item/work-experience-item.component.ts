import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {
  CvWorkExperience,
} from "./../../../../../models/cv-work-experience.model";
import * as _ from "lodash";
import {AppService} from "./../../../../../services/app.service";

@Component({
  selector: 'app-work-experience-item',
  templateUrl: './work-experience-item.component.html',
  styleUrls: ['./work-experience-item.component.scss']
})
export class WorkExperienceItemComponent implements OnInit, OnChanges {
  @Input() data: CvWorkExperience;

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
