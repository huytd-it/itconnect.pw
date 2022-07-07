import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {
  CreateOrEditCvWorkExperience,
  CvWorkExperience,
  CvWorkExperiencePosition,
  CvWorkExperienceSkill,
  CvWorkExperienceStatus
} from "../../../../../../models/cv-work-experience.model";
import * as _ from "lodash";
import {CreateTaggedOutput, SearchPageOutput, TaggedInput} from "../../../../../../models/common";
import {SkillService} from "../../../../../../services/skill.service";
import {AppService} from "../../../../../../services/app.service";
import {CvWorkExperienceSkillService} from "../../../../../../services/cv-work-experience-skill.service";
import {finalize} from "rxjs";
import {CvWorkExperiencePositionService} from "../../../../../../services/cv-work-experience-position.service";
import {PositionService} from "../../../../../../services/position.service";
import {MatDialog} from "@angular/material/dialog";
import {
  WorkExperienceNextModalComponent
} from "../../../../components/work-experience-next-modal/work-experience-next-modal.component";
import * as moment from "moment";
import {CvWorkExperienceService} from "../../../../../../services/cv-work-experience.service";
import {WorkExperienceMinModalComponent} from "../work-experience-min-modal/work-experience-min-modal.component";

@Component({
  selector: 'app-work-experience-item',
  templateUrl: './work-experience-item.component.html',
  styleUrls: ['./work-experience-item.component.scss']
})
export class WorkExperienceItemComponent implements OnInit, OnChanges {
  @Input() showV2: boolean;
  @Input() data: CvWorkExperience;
  @Output() onEdit = new EventEmitter<CvWorkExperience>();
  @Output() onRemove = new EventEmitter<CvWorkExperience>();
  @Output() onReload = new EventEmitter();

  skillItems: CvWorkExperienceSkill[];
  positionItems: CvWorkExperiencePosition[];

  readonly CvWorkExperienceStatus = CvWorkExperienceStatus;

  get hasButtonNextAndEnd() {
    const s = moment(this.data.startDate).startOf('month');
    const e = moment().startOf('month')
    return this.data.status != CvWorkExperienceStatus.WaitVerify &&
      !this.data.endDate && e.diff(s, 'month') >= 1;
  };

  constructor(
    private skillService: SkillService,
    private positionService: PositionService,
    private appService: AppService,
    private cvWorkExperienceSkillService: CvWorkExperienceSkillService,
    private cvWorkExperiencePositionService: CvWorkExperiencePositionService,
    private cvWorkExperienceService: CvWorkExperienceService,
    public dialog: MatDialog
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

  onNextTimeline() {
    const dialogRef = this.dialog.open(WorkExperienceNextModalComponent, {
      maxWidth: '95vw',
      maxHeight: '95vh',
      data: {
        ...this.data,
        cvWorkExperiencePositions: this.positionItems,
        cvWorkExperienceSkills: this.skillItems
      }
    });

    dialogRef.afterClosed().subscribe((result: {reload: boolean}) => {
      if (result.reload) {
        this.onReload?.emit();
      }
    });
  }

  onEndTimeline() {
    const dialogRef = this.dialog.open(WorkExperienceMinModalComponent, {
      maxWidth: '95vw',
      maxHeight: '95vh',
      data: {
        data: this.data,
        allowEndDate: true,
        fnUpdate: (data: CvWorkExperience) => {
          this.appService.setHeadLoading(true);
          return this.cvWorkExperienceService.createOrEdit({
            ...this.getBody(),
            endDate: data.endDate
          }).pipe(finalize(() => this.appService.setHeadLoading(false)));
        }
      }
    });

    dialogRef.afterClosed().subscribe((status) => {
      if (status) {
        this.onReload?.emit();
      }
    });
  }

  onCancelWaitVerify() {
    this.appService.setHeadLoading(true);
    this.cvWorkExperienceService.createOrEdit({
      ...this.getBody(),
      status: CvWorkExperienceStatus.NotVerify
    })
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.data.status = CvWorkExperienceStatus.NotVerify;
      })
  }

  getBody(): CreateOrEditCvWorkExperience {
    return {
      id: this.data.id,
      startDate: this.data.startDate,
      companyTag: this.data.companyTag.id,
      jobLevel: this.data.jobLevel?.id,
      jobType: this.data.jobType?.id,
      workFrom: this.data.workFrom?.id,
      content: this.data.content
    }
  }
}
