import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {faArrowDown, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {JobLevelService} from "../../../../../../services/job-level.service";
import {CompanyTagService} from "../../../../../../services/company-tag.service";
import {WorkFromService} from "../../../../../../services/work-from.service";
import {SearchPageOutput} from "../../../../../../models/common";
import {AppService} from "../../../../../../services/app.service";
import {finalize} from "rxjs";
import {EasySelectComponent} from "../../../../../../components/easy-select/easy-select.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CreateOrEditCvWorkExperience, CvWorkExperience} from "../../../../../../models/cv-work-experience.model";
import {CvWorkExperienceService} from "../../../../../../services/cv-work-experience.service";
import {JobTypeService} from "../../../../../../services/job-type.service";

enum FormField {
  Company = 'companyTag',
  WorkFrom = 'workFrom',
  JobLevel = 'jobLevel',
  JobType = 'jobType',
  StartDate = 'startDate',
  EndDate = 'endDate',
  Content = 'content'
}

@Component({
  selector: 'app-work-experience-modal',
  templateUrl: './work-experience-modal.component.html',
  styleUrls: ['./work-experience-modal.component.scss']
})
export class WorkExperienceModalComponent implements OnInit {
  @ViewChild('selectCompany') selectCompany: EasySelectComponent;
  faArrowRight = faArrowRight;
  faArrowDown = faArrowDown;
  isToggleWorking: boolean;
  form: FormGroup;
  readonly FormField = FormField;

  get maxDate() {
    return moment().toDate();
  }

  get minDate() {
    const value = this.form.controls[FormField.StartDate].value;
    if (value) {
      return moment(value).add(1, 'month').toDate();
    }
    return moment().toDate();
  }

  constructor(
    private jobLevelService: JobLevelService,
    private jobTypeService: JobTypeService,
    private companyTagService: CompanyTagService,
    private workFromService: WorkFromService,
    private cvWorkExperienceService: CvWorkExperienceService,
    private appService: AppService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<WorkExperienceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CvWorkExperience,
  ) {
    this.form = this.formBuilder.group({
      [FormField.Company]: [null, [Validators.required]],
      [FormField.JobLevel]: [null],
      [FormField.JobType]: [null],
      [FormField.WorkFrom]: [null],
      [FormField.Content]: [null],
      [FormField.StartDate]: [null, [Validators.required]],
      [FormField.EndDate]: [null, [Validators.required]],
    })
  }

  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue({
        [FormField.Company]: this.data.companyTag,
        [FormField.WorkFrom]: this.data.workFrom,
        [FormField.JobLevel]: this.data.jobLevel,
        [FormField.JobType]: this.data.jobType,
        [FormField.StartDate]: this.data.startDate ? moment(this.data.startDate) : null,
        [FormField.EndDate]: this.data.endDate ? moment(this.data.endDate) : null,
        [FormField.Content]: this.data.content
      })
      this.isToggleWorking = !this.data.endDate;
      this.onChangeToggleWorking();
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

  onChangeToggleWorking() {
    const control = this.form.controls[FormField.EndDate];
    if (this.isToggleWorking) {
      control.setValue(null);
      control.disable()
    } else {
      control.enable()
    }
  }

  isControlError(field: FormField, ...types: string[]) {
    const control = this.form.controls[field];
    if (control.invalid && (control.touched || control.dirty)) {
      return types.some(type => !!control?.errors?.[type]);
    }
    return false;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value;
    const data: CreateOrEditCvWorkExperience = {
      content: value[FormField.Content],
      workFrom: value[FormField.WorkFrom]?.id,
      jobLevel: value[FormField.JobLevel]?.id,
      jobType: value[FormField.JobType]?.id,
      startDate: value[FormField.StartDate],
      endDate: value[FormField.EndDate],
      companyTag: value[FormField.Company]?.id,
    }

    if (this.data) {
      data.id = this.data.id;
    }

    this.appService.setHeadLoading(true);
    this.cvWorkExperienceService.createOrEdit(data)
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.onClose(data);
      })
  }

  onClose(data?: CvWorkExperience) {
    this.dialogRef.close(data);
  }
}
