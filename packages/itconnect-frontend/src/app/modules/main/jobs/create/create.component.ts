import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PositionService} from "../../../../services/position.service";
import {SkillService} from "../../../../services/skill.service";
import {AppService} from "../../../../services/app.service";
import {CreateTaggedOutput, SearchPageOutput, TaggedInput} from "../../../../models/common";
import {PositionSearchOutput} from "../../../../models/position.model";
import {SkillSearchOutput} from "../../../../models/skill.model";
import {WorkFromService} from "../../../../services/work-from.service";
import {WorkFromSearchOutput} from "../../../../models/work-from.model";
import {
  JobCertificateCreateOrEdit,
  JobCreateOrEditOutput,
  JobJobLevelCreateOrEdit,
  JobPositionCreateOrEdit,
  JobSchoolCreateOrEdit,
  JobSkillCreateOrEdit,
  JobWorkFromCreateOrEdit
} from "../../../../models/job.model";
import {CertificateSearchOutput} from "../../../../models/certificate.model";
import {CertificateService} from "../../../../services/certificate.service";
import {SchoolService} from "../../../../services/school.service";
import {SchoolSearchOutput} from "../../../../models/school.model";
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import {JobLevelService} from "../../../../services/job-level.service";
import {JobLevelSearchOutput} from "../../../../models/job-level.model";
import {CompanyTagService} from "../../../../services/company-tag.service";
import {CompanyTagSearchOutput} from "../../../../models/company-tag.model";
import {EasySelectComponent} from "../../../../components/easy-select/easy-select.component";
import {catchError, finalize} from "rxjs";
import * as moment from "moment";
import {JobService} from "../../../../services/job.service";
import {JobTypeService} from "../../../../services/job-type.service";
import {JobTypeSearchOutput} from "../../../../models/job-type.model";
import {ActivatedRoute, Router} from "@angular/router";

export enum FormField {
  skills = "skills",
  positions = "positions",
  certificate = "certificate",
  school = "school",
  workFrom = "workFrom",
  jobLevel = "jobLevel",
  jobType = "jobType",
  name = "name",
  salaryFrom = "salaryFrom",
  salaryTo = "salaryTo",
  dateEnd = "dateEnd",
  yoe = "yoe",
  companyTag = "companyTag",
  address = "address",
  Description = 'Description',
  SkillExperience = 'SkillExperience',
  Reason = 'Reason'
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  @ViewChild('selectCompany') selectCompany: EasySelectComponent;
  form: FormGroup;
  faArrowRight = faArrowRight;
  faArrowDown = faArrowDown;
  yoeList = Array.from({ length: 10 }).map((__, index) => ({
      id: index + 1,
      name: `${index + 1}+`
  }))

  readonly FormField = FormField;

  get minDate() {
    return moment().add(1, 'day').toDate();
  }

  get isSubmitting() {
    return this.appService.headLoading$;
  }

  constructor(
    private formBuilder: FormBuilder,
    private positionService: PositionService,
    private skillService: SkillService,
    private workFromService: WorkFromService,
    private certificateService: CertificateService,
    private schoolService: SchoolService,
    private jobLevelService: JobLevelService,
    private companyTagService: CompanyTagService,
    private jobTypeService: JobTypeService,
    private appService: AppService,
    private jobService: JobService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.form = this.formBuilder.group({
      [FormField.skills]: [null],
      [FormField.positions]: [null],
      [FormField.certificate]: [null],
      [FormField.school]: [null],
      [FormField.workFrom]: [null],
      [FormField.jobLevel]: [null],
      [FormField.jobType]: [null],
      [FormField.name]: [null, [Validators.required, Validators.maxLength(255), Validators.minLength(1)]],
      [FormField.dateEnd]: [null, Validators.required],
      [FormField.salaryFrom]: [null, Validators.min(0)],
      [FormField.salaryTo]: [null],
      [FormField.yoe]: [null],
      [FormField.companyTag]: [null, Validators.required],
      [FormField.address]: [null, Validators.required],
      [FormField.SkillExperience]: [null, Validators.required],
      [FormField.Description]: [null, Validators.required],
      [FormField.Reason]: [null],
    }, {
      validators: this.customValidate
    })
  }

  ngOnInit(): void {
  }

  private customValidate(formGroup: FormGroup) {
    const salaryMinControl = formGroup.controls[FormField.salaryFrom];
    const salaryMaxControl = formGroup.controls[FormField.salaryTo];
    if (salaryMaxControl.value) {
      if (
        !salaryMinControl.value ||
        Number(salaryMaxControl.value) < Number(salaryMinControl.value)
      ) {
        salaryMaxControl.setErrors({ minSalary: true })
      } else {
        salaryMaxControl.setErrors(null)
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

  /**
   * Position
   *
   */
  fetchDataPosition = (query: SearchPageOutput) => {
    const qr: PositionSearchOutput = query;
    return this.positionService.search(qr);
  }

  fnAddUserTaggedPosition = (data: CreateTaggedOutput) => {
    return this.positionService.createTag(data);
  }

  onAddDataPosition = (item: TaggedInput) => {
    const control = this.form.controls[FormField.positions];
    const value: JobPositionCreateOrEdit[] = control.value || [];
    const exists = value.find(it => it.position === item.id);
    if (exists) {
      return;
    }

    value.push({
      position: item.id,
      levelMin: 1,
      levelMax: 10,
      name: item.name
    })
    control.setValue(value);
  }

  onChangeDataPosition = (item: JobPositionCreateOrEdit) => {
  }

  onRemoveDataPosition = (item: JobPositionCreateOrEdit) => {
    const control = this.form.controls[FormField.positions];
    const value: JobPositionCreateOrEdit[] = control.value || [];
    control.setValue(value.filter(it => it.position != item.position));
  }

  /**
   * Skill
   *
   */
  fetchDataSkill = (query: SearchPageOutput) => {
    const qr: SkillSearchOutput = query;
    return this.skillService.search(qr);
  }

  fnAddUserTaggedSkill = (data: CreateTaggedOutput) => {
    return this.skillService.createTag(data);
  }

  onAddDataSkill = (item: TaggedInput) => {
    const control = this.form.controls[FormField.skills];
    const value: JobSkillCreateOrEdit[] = control.value || [];
    const exists = value.find(it => it.skill === item.id);
    if (exists) {
      return;
    }

    value.push({
      skill: item.id,
      levelMin: 1,
      levelMax: 10,
      name: item.name
    })
    control.setValue(value);
  }

  onChangeDataSkill = (item: JobSkillCreateOrEdit) => {
  }

  onRemoveDataSkill = (item: JobSkillCreateOrEdit) => {
    const control = this.form.controls[FormField.skills];
    const value: JobSkillCreateOrEdit[] = control.value || [];
    control.setValue(value.filter(it => it.skill != item.skill));
  }

  /**
   * Certificate
   *
   */
  fetchDataCertificate = (query: SearchPageOutput) => {
    const qr: CertificateSearchOutput = query;
    return this.certificateService.search(qr);
  }

  fnAddUserTaggedCertificate = (data: CreateTaggedOutput) => {
    return this.certificateService.createTag(data);
  }

  onAddDataCertificate = (item: TaggedInput) => {
    const control = this.form.controls[FormField.certificate];
    const value: JobCertificateCreateOrEdit[] = control.value || [];
    const exists = value.find(it => it.certificate === item.id);
    if (exists) {
      return;
    }

    value.push({
      certificate: item.id,
      levelMin: 1,
      levelMax: 10,
      name: item.name
    })
    control.setValue(value);
  }

  onChangeDataCertificate = (item: JobCertificateCreateOrEdit) => {
  }

  onRemoveDataCertificate = (item: JobCertificateCreateOrEdit) => {
    const control = this.form.controls[FormField.certificate];
    const value: JobCertificateCreateOrEdit[] = control.value || [];
    control.setValue(value.filter(it => it.certificate != item.certificate));
  }

  /**
   * School
   *
   */
  fetchDataSchool = (query: SearchPageOutput) => {
    const qr: SchoolSearchOutput = query;
    return this.schoolService.search(qr);
  }

  fnAddUserTaggedSchool = (data: CreateTaggedOutput) => {
    return this.schoolService.createTag(data);
  }

  onAddDataSchool = (item: TaggedInput) => {
    const control = this.form.controls[FormField.school];
    const value: JobSchoolCreateOrEdit[] = control.value || [];
    const exists = value.find(it => it.school === item.id);
    if (exists) {
      return;
    }

    value.push({
      school: item.id,
      name: item.name
    })
    control.setValue(value);
  }

  onChangeDataSchool = (item: JobSchoolCreateOrEdit) => {
  }

  onRemoveDataSchool = (item: JobSchoolCreateOrEdit) => {
    const control = this.form.controls[FormField.school];
    const value: JobSchoolCreateOrEdit[] = control.value || [];
    control.setValue(value.filter(it => it.school != item.school));
  }


  /**
   * Work from
   *
   *
   */
  fetchDataWorkFrom = (query: SearchPageOutput) => {
    const qr: WorkFromSearchOutput = query;
    return this.workFromService.search(qr);
  }

  onAddDataWorkFrom(e: TaggedInput) {
    const control = this.form.controls[FormField.workFrom];
    const value: JobWorkFromCreateOrEdit[] = control.value || [];
    const exists = value.find(it => it.workFrom === e.id);
    if (exists) {
      return;
    }

    value.push({
      workFrom: e.id,
      name: e.name
    })
    control.setValue(value);
  }

  onRemoveDataWorkFrom(e: JobWorkFromCreateOrEdit) {
    const control = this.form.controls[FormField.workFrom];
    const value: JobWorkFromCreateOrEdit[] = control.value || [];
    control.setValue(value.filter(it => it.workFrom != e.workFrom));
  }

  /**
   * Job level
   *
   */
  fetchDataJobLevel = (query: SearchPageOutput) => {
    const qr: JobLevelSearchOutput = query;
    return this.jobLevelService.search(qr);
  }

  onAddDataJobLevel = (item: TaggedInput) => {
    const control = this.form.controls[FormField.jobLevel];
    const value: JobJobLevelCreateOrEdit[] = control.value || [];
    const exists = value.find(it => it.jobLevel === item.id);
    if (exists) {
      return;
    }

    value.push({
      jobLevel: item.id,
      name: item.name
    })
    control.setValue(value);
  }

  onChangeDataJobLevel = (item: JobJobLevelCreateOrEdit) => {
  }

  onRemoveDataJobLevel = (item: JobJobLevelCreateOrEdit) => {
    const control = this.form.controls[FormField.jobLevel];
    const value: JobJobLevelCreateOrEdit[] = control.value || [];
    control.setValue(value.filter(it => it.jobLevel != item.jobLevel));
  }

  /**
   * Company name
   *
   */
  fetchDataCompanyTag = (query: SearchPageOutput) => {
    const qr: CompanyTagSearchOutput = query;
    return this.companyTagService.search(qr);
  }

  onAddCompanyTag(e: string) {
    this.appService.setHeadLoading(true);
    this.companyTagService.createTag({ name: e })
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe((data) => {
        this.form.controls[FormField.companyTag].setValue(data);
        this.selectCompany.close();
      })
  }

  /**
   * Job type
   *
   */
  fetchDataJobType = (query: SearchPageOutput) => {
    const qr: JobTypeSearchOutput = query;
    return this.jobTypeService.search(qr);
  }

  onSubmit() {
    this.save(false);
  }

  onSaveDraft() {
    this.save(true);
  }

  onReset() {
    this.form.reset();
  }

  private save(isDraft: boolean) {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value;
    const address = value[FormField.address];
    const data: JobCreateOrEditOutput = {
      addressStreet: address.street,
      addressVillage: address.villageId.id,
      addressProvince: address.provinceId.id,
      addressDistrict: address.districtId.id,
      jobPositions: value[FormField.positions],
      jobSkills: value[FormField.skills],
      jobCertificates: value[FormField.certificate],
      jobSchools: value[FormField.school],
      jobWorkFrom: value[FormField.workFrom],
      jobJobLevels: value[FormField.jobLevel],
      jobType: value[FormField.jobType]?.id,
      companyTag: value[FormField.companyTag]?.id,
      salaryMin: value[FormField.salaryTo] && Number(value[FormField.salaryFrom]),
      salaryMax: value[FormField.salaryTo] && Number(value[FormField.salaryTo]),
      name: value[FormField.name],
      yoe: value[FormField.yoe]?.id,
      endDate: value[FormField.dateEnd],
      descriptionContent: value[FormField.Description],
      requirementContent: value[FormField.SkillExperience],
      reasonContent: value[FormField.Reason]
    }

    this.appService.setHeadLoading(true);
    this.jobService.createOrEdit(data, true, isDraft)
      .pipe(finalize(() => {
        this.appService.setHeadLoading(false);
      }))
      .subscribe((data) => {
        this.router.navigate(['..', 'view', data.id.toString()], { relativeTo: this.route }).then(() => {})
      })
  }
}
