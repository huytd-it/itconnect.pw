import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CvWorkExperience} from "../../../../../../models/cv-work-experience.model";

@Component({
  selector: 'app-work-experience-group',
  templateUrl: './work-experience-group.component.html',
  styleUrls: ['./work-experience-group.component.scss']
})
export class WorkExperienceGroupComponent implements OnInit {
  @Input() data: CvWorkExperience[];
  @Output() onEdit = new EventEmitter<CvWorkExperience>();
  @Output() onRemove = new EventEmitter<CvWorkExperience>();
  @Output() onReload = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
