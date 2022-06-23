import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {
  CvWorkExperience,
  CvWorkExperiencePosition,
  CvWorkExperienceSkill
} from "../../../../../../models/cv-work-experience.model";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import * as _ from "lodash";
import {CreateTaggedOutput, SearchPageOutput, TaggedInput} from "../../../../../../models/common";
import {SkillService} from "../../../../../../services/skill.service";
import {AppService} from "../../../../../../services/app.service";
import {CvWorkExperienceSkillService} from "../../../../../../services/cv-work-experience-skill.service";
import {finalize} from "rxjs";
import {CvWorkExperiencePositionService} from "../../../../../../services/cv-work-experience-position.service";
import {PositionService} from "../../../../../../services/position.service";
import {CvEducation} from "../../../../../../models/cv-education.model";

@Component({
  selector: 'app-education-item',
  templateUrl: './education-item.component.html',
  styleUrls: ['./education-item.component.scss']
})
export class EducationItemComponent implements OnInit, OnChanges {
  @Input() data: CvEducation;
  @Output() onEdit = new EventEmitter<CvEducation>();
  @Output() onRemove = new EventEmitter<CvEducation>();

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
