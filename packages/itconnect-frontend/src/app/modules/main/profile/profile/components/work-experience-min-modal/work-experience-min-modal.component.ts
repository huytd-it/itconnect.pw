import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {faArrowDown, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {JobLevelService} from "../../../../../../services/job-level.service";
import {CompanyTagService} from "../../../../../../services/company-tag.service";
import {WorkFromService} from "../../../../../../services/work-from.service";
import {SearchPageOutput} from "../../../../../../models/common";
import {AppService} from "../../../../../../services/app.service";
import {catchError, finalize, throwError} from "rxjs";
import {EasySelectComponent} from "../../../../../../components/easy-select/easy-select.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CreateOrEditCvWorkExperience, CvWorkExperience} from "../../../../../../models/cv-work-experience.model";
import {CvWorkExperienceService} from "../../../../../../services/cv-work-experience.service";
import {JobTypeService} from "../../../../../../services/job-type.service";
import {CompanyTag} from "../../../../../../models/company-tag.model";

enum FormField {
  EndDate = 'endDate',
  Content = 'content'
}

@Component({
  selector: 'app-work-experience-min-modal',
  templateUrl: './work-experience-min-modal.component.html',
  styleUrls: ['./work-experience-min-modal.component.scss']
})
export class WorkExperienceMinModalComponent implements OnInit {
  @ViewChild('selectCompany') selectCompany: EasySelectComponent;
  form: FormGroup;
  readonly FormField = FormField;

  get maxDate() {
    return moment().toDate();
  }

  get minDate() {
    return moment(this.data?.data?.startDate).add(1, 'month').toDate();
  }

  constructor(
    private jobLevelService: JobLevelService,
    private jobTypeService: JobTypeService,
    private companyTagService: CompanyTagService,
    private workFromService: WorkFromService,
    private cvWorkExperienceService: CvWorkExperienceService,
    private appService: AppService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<WorkExperienceMinModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      data: CvWorkExperience,
      allowContent: boolean,
      allowEndDate: boolean,
      fnUpdate: any
    },
  ) {
    this.form = this.formBuilder.group({
      [FormField.Content]: [null],
      [FormField.EndDate]: [null, [Validators.required]],
    })
  }

  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue({
        [FormField.EndDate]: moment().startOf('month'),
        [FormField.Content]: this.data.data.content
      })
      if (!this.data.allowContent) {
        this.form.controls[FormField.Content].disable();
      }
      if (!this.data.allowEndDate) {
        this.form.controls[FormField.EndDate].disable();
      }
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
    const data: CreateOrEditCvWorkExperience = <any>{}
    data.endDate = value[FormField.EndDate];
    data.content = value[FormField.Content];
    this.data.fnUpdate(data).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  onClose() {
    this.dialogRef.close(false)
  }
}
