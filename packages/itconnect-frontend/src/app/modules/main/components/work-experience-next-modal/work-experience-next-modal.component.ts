import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {JobLevelService} from "../../../../services/job-level.service";
import {CompanyTagService} from "../../../../services/company-tag.service";
import {WorkFromService} from "../../../../services/work-from.service";
import {CreateTaggedOutput, SearchPageOutput, TaggedInput} from "../../../../models/common";
import {AppService} from "../../../../services/app.service";
import {finalize, forkJoin, mergeMap} from "rxjs";
import {EasySelectComponent} from "../../../../components/easy-select/easy-select.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {
  CreateOrEditCvWorkExperience,
  CvWorkExperience,
  CvWorkExperienceStatus
} from "../../../../models/cv-work-experience.model";
import {CvWorkExperienceService} from "../../../../services/cv-work-experience.service";
import {JobTypeService} from "../../../../services/job-type.service";
import {CompanyTag} from "../../../../models/company-tag.model";
import {CvWorkExperienceSkillService} from "../../../../services/cv-work-experience-skill.service";
import {CvWorkExperiencePositionService} from "../../../../services/cv-work-experience-position.service";
import {SkillService} from "../../../../services/skill.service";
import {PositionService} from "../../../../services/position.service";
import {Skill} from "../../../../models/skill.model";
import {Position} from "../../../../models/position.model";
import * as _ from "lodash";

enum FormField {
  Company = 'companyTag',
  WorkFrom = 'workFrom',
  JobLevel = 'jobLevel',
  JobType = 'jobType',
  StartDate = 'startDate',
  Content = 'content',
  Valid = 'valid'
}

@Component({
  selector: 'app-work-experience-next-modal',
  templateUrl: './work-experience-next-modal.component.html',
  styleUrls: ['./work-experience-next-modal.component.scss']
})
export class WorkExperienceNextModalComponent implements OnInit {
  @ViewChild('selectCompany') selectCompany: EasySelectComponent;
  form: FormGroup;
  skillItems: Skill[] = [];
  positionItems: Position[] = [];
  oldSkillItems: Skill[] = [];
  oldPositionItems: Position[] = [];
  oldData: CreateOrEditCvWorkExperience;
  readonly FormField = FormField;

  get maxDate() {
    return moment().toDate();
  }

  get minDate() {
    if (this.data?.startDate) {
      return moment(this.data.startDate).add(1, 'month').toDate()
    }
    return this.data?.endDate;
  }

  get isVerify() {
    return this.data.status === CvWorkExperienceStatus.Verify;
  }

  get hasChange() {
    if (this.data.newData) {
      return true
    }
    return (
      !_.isEqual(this.oldData, this.getData()) ||
        !_.isEqual(this.oldSkillItems.map(it => it.id).sort(), this.skillItems.map(it => it.id).sort()) ||
        !_.isEqual(this.oldPositionItems.map(it => it.id).sort(), this.positionItems.map(it => it.id).sort())
    );
  }

  constructor(
    private jobLevelService: JobLevelService,
    private jobTypeService: JobTypeService,
    private companyTagService: CompanyTagService,
    private workFromService: WorkFromService,
    private cvWorkExperienceService: CvWorkExperienceService,
    private cvWorkExperienceSkillService: CvWorkExperienceSkillService,
    private cvWorkExperiencePositionService: CvWorkExperiencePositionService,
    private skillService: SkillService,
    private positionService: PositionService,
    public appService: AppService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<WorkExperienceNextModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CvWorkExperience & { newData: boolean },
  ) {
    this.form = this.formBuilder.group({
      [FormField.Company]: [null, [Validators.required]],
      [FormField.JobLevel]: [null],
      [FormField.JobType]: [null],
      [FormField.WorkFrom]: [null],
      [FormField.Content]: [null],
      [FormField.StartDate]: [null, [Validators.required]],
      [FormField.Valid]: [null, [Validators.required]]
    })
  }

  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue({
        [FormField.Company]: this.data.companyTag,
        [FormField.WorkFrom]: this.data.workFrom,
        [FormField.JobLevel]: this.data.jobLevel,
        [FormField.JobType]: this.data.jobType,
        [FormField.StartDate]: moment().startOf('month'),
        [FormField.Content]: this.data.content
      })
      if (!this.isVerify) {
        this.form.controls[FormField.Valid].disable();
      }
      if (this.data.cvWorkExperienceSkills) {
        this.skillItems = this.data.cvWorkExperienceSkills.map(item => item.skill);
        this.oldSkillItems = _.cloneDeep(this.skillItems);
      }
      if (this.data.cvWorkExperiencePositions) {
        this.positionItems = this.data.cvWorkExperiencePositions.map(item => item.position);
        this.oldPositionItems = _.cloneDeep(this.positionItems);
      }
      this.oldData = this.getData();
    }
  }

  fetchWorkFrom = (query: SearchPageOutput) => {
    return this.workFromService.search(query);
  }

  fetchJobLevel = (query: SearchPageOutput) => {
    return this.jobLevelService.search(query);
  }

  fetchJobType = (query: SearchPageOutput) => {
    return this.jobTypeService.search(query);
  }

  fetchCompanyTag = (query: SearchPageOutput) => {
    return this.companyTagService.search(query);
  }

  onAddCompanyTag(e: string) {
    this.appService.setHeadLoading(true);
    this.companyTagService.createTag({ name: e })
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe((data) => {
        this.form.controls[FormField.Company].setValue(data);
        this.selectCompany.close();
      })
  }

  onSelectCompany(data: CompanyTag) {
    this.form.controls[FormField.Company].setValue(data);
  }

  isControlError(field: FormField, ...types: string[]) {
    const control = this.form.controls[field];
    if (control.invalid && (control.touched || control.dirty)) {
      return types.some(type => !!control?.errors?.[type]);
    }
    return false;
  }

  getData(): CreateOrEditCvWorkExperience {
    const value = this.form.value;
    return {
      content: value[FormField.Content],
      workFrom: value[FormField.WorkFrom]?.id,
      jobLevel: value[FormField.JobLevel]?.id,
      jobType: value[FormField.JobType]?.id,
      startDate: value[FormField.StartDate],
      companyTag: value[FormField.Company]?.id,
      force: true
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data: CreateOrEditCvWorkExperience = this.getData();
    data.status = this.isVerify ? CvWorkExperienceStatus.WaitVerify : CvWorkExperienceStatus.NotVerify;

    this.appService.setHeadLoading(true);
    const res = this.cvWorkExperienceService.createOrEdit(data);

    if (this.skillItems?.length || this.positionItems?.length) {
      res.pipe(
        mergeMap(res =>
          forkJoin([
            ...this.skillItems.map(skill => {
              return this.cvWorkExperienceSkillService.createOrEdit({ cvWorkExperience: res.id, skill: skill.id })
            }),
            ...this.positionItems.map(position => {
              return this.cvWorkExperiencePositionService.createOrEdit({ cvWorkExperience: res.id, position: position.id })
            })
          ])
        )
      );
    }

    res.pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.onClose({ reload: true } as any);
      })
  }

  onClose(data?: { data: CvWorkExperience, reload: boolean }) {
    this.dialogRef.close(data);
  }

  fetchDataSkill = (query: SearchPageOutput) => {
    return this.skillService.search(query);
  }

  createTagSkill = (data: CreateTaggedOutput) => {
    return this.skillService.createTag(data);
  }

  onAddSkill(e: TaggedInput) {
    const index = this.skillItems.findIndex(it => it.id === e.id);
    if (index < 0) {
      this.skillItems.push(e as any);
    }
  }

  onRemoveSkill(e: Skill) {
    this.skillItems = this.skillItems.filter(it => it.id != e.id)
  }

  fetchDataPosition = (query: SearchPageOutput) => {
    return this.positionService.search(query);
  }

  createTagPosition = (data: CreateTaggedOutput) => {
    return this.positionService.createTag(data);
  }

  onAddPosition(e: TaggedInput) {
    const index = this.positionItems.findIndex(it => it.id === e.id);
    if (index < 0) {
      this.positionItems.push(e as any);
    }
  }

  onRemovePosition(e: Position) {
    this.positionItems = this.positionItems.filter(it => it.id != e.id)
  }
}
