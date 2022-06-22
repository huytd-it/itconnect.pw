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

@Component({
  selector: 'app-work-experience-item',
  templateUrl: './work-experience-item.component.html',
  styleUrls: ['./work-experience-item.component.scss']
})
export class WorkExperienceItemComponent implements OnInit, OnChanges {
  @Input() data: CvWorkExperience;
  @Output() onEdit = new EventEmitter<CvWorkExperience>();
  @Output() onRemove = new EventEmitter<CvWorkExperience>();

  skillItems: CvWorkExperienceSkill[];
  positionItems: CvWorkExperiencePosition[];

  constructor(
    private skillService: SkillService,
    private positionService: PositionService,
    private appService: AppService,
    private cvWorkExperienceSkillService: CvWorkExperienceSkillService,
    private cvWorkExperiencePositionService: CvWorkExperiencePositionService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const {data} = changes;
    if (data && data.currentValue && !_.isEqual(data.currentValue, data.previousValue)) {
      setTimeout(() => this.refactorData());
    }
  }

  private refactorData() {
    this.skillItems = this.cvWorkExperienceSkillService.refactorData(this.data.cvWorkExperienceSkills)
    this.positionItems = this.cvWorkExperiencePositionService.refactorData(this.data.cvWorkExperiencePositions)
  }

  fetchDataSkill = (query: SearchPageOutput) => {
    return this.skillService.search(query);
  }

  createTagSkill = (data: CreateTaggedOutput) => {
    return this.skillService.createTag(data);
  }

  onAddSkill(e: TaggedInput) {
    this.appService.setHeadLoading(true);
    this.cvWorkExperienceSkillService
      .createOrEdit({
        cvWorkExperience: this.data.id,
        skill: e.id
      })
      .pipe(finalize((() => this.appService.setHeadLoading(false))))
      .subscribe(data => {
        this.skillItems.push(this.cvWorkExperienceSkillService.refactorData([data])[0]);
      })
  }

  onRemoveSkill(e: CvWorkExperienceSkill) {
    this.appService.setHeadLoading(true);
    this.cvWorkExperienceSkillService.delete(e.id)
      .pipe(finalize((() => this.appService.setHeadLoading(false))))
      .subscribe(data => {
        this.skillItems = this.skillItems.filter(item => item.id !== e.id);
      })
  }

  fetchDataPosition = (query: SearchPageOutput) => {
    return this.positionService.search(query);
  }

  createTagPosition = (data: CreateTaggedOutput) => {
    return this.positionService.createTag(data);
  }

  onAddPosition(e: TaggedInput) {
    this.appService.setHeadLoading(true);
    this.cvWorkExperiencePositionService
      .createOrEdit({
        cvWorkExperience: this.data.id,
        position: e.id
      })
      .pipe(finalize((() => this.appService.setHeadLoading(false))))
      .subscribe(data => {
        this.positionItems.push(this.cvWorkExperiencePositionService.refactorData([data])[0]);
      })
  }

  onRemovePosition(e: CvWorkExperiencePosition) {
    this.appService.setHeadLoading(true);
    this.cvWorkExperiencePositionService.delete(e.id)
      .pipe(finalize((() => this.appService.setHeadLoading(false))))
      .subscribe(data => {
        this.positionItems = this.positionItems.filter(item => item.id !== e.id);
      })
  }
}
