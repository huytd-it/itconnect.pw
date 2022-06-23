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
import {CreateOrEditCvEducation, CvEducation} from "../../../../../../models/cv-education.model";
import {CvEducationService} from "../../../../../../services/cv-education.service";
import {SchoolService} from "../../../../../../services/school.service";
import {RankedAcademicService} from "../../../../../../services/ranked-academic.service";

enum FormField {
  School = 'school',
  RankedAcademic = 'rankedAcademic',
  StartDate = 'startDate',
  EndDate = 'endDate',
  Content = 'content',
  Mark = 'mark'
}

@Component({
  selector: 'app-education-modal',
  templateUrl: './education-modal.component.html',
  styleUrls: ['./education-modal.component.scss']
})
export class EducationModalComponent implements OnInit {
  @ViewChild('selectSchool') selectSchool: EasySelectComponent;
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
    private cvEducationService: CvEducationService,
    private schoolService: SchoolService,
    private rankedAcademicService: RankedAcademicService,
    private appService: AppService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EducationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CvEducation,
  ) {
    this.form = this.formBuilder.group({
      [FormField.School]: [null, [Validators.required]],
      [FormField.RankedAcademic]: [null],
      [FormField.Mark]: [null],
      [FormField.Content]: [null],
      [FormField.StartDate]: [null, [Validators.required]],
      [FormField.EndDate]: [null, [Validators.required]],
    })
  }

  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue({
        [FormField.School]: this.data.school,
        [FormField.RankedAcademic]: this.data.rankedAcademic,
        [FormField.Mark]: this.data.mark,
        [FormField.StartDate]: this.data.startDate ? moment(this.data.startDate) : null,
        [FormField.EndDate]: this.data.endDate ? moment(this.data.endDate) : null,
        [FormField.Content]: this.data.content
      })
      this.isToggleWorking = !this.data.endDate;
      this.onChangeToggleWorking();
    }
  }

  fetchSchool = (query: SearchPageOutput) => {
    return this.schoolService.search(query);
  }

  fetchRankedAcademic = (query: SearchPageOutput) => {
    return this.rankedAcademicService.search(query);
  }

  onAddSchool(e: string) {
    this.appService.setHeadLoading(true);
    this.schoolService.createTag({ name: e })
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe((data) => {
        this.form.controls[FormField.School].setValue(data);
        this.selectSchool.close();
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
    const data: CreateOrEditCvEducation = {
      content: value[FormField.Content],
      school: value[FormField.School]?.id,
      rankedAcademic: value[FormField.RankedAcademic]?.id,
      startDate: value[FormField.StartDate],
      endDate: value[FormField.EndDate],
      mark: value[FormField.Mark],
    }

    if (this.data) {
      data.id = this.data.id;
    }

    this.appService.setHeadLoading(true);
    this.cvEducationService.createOrEdit(data)
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.onClose(data);
      })
  }

  onClose(data?: CvEducation) {
    this.dialogRef.close(data);
  }
}
