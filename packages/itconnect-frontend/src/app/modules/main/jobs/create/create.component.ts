import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PositionService} from "../../../../services/position.service";
import {SkillService} from "../../../../services/skill.service";
import {AppService} from "../../../../services/app.service";
import {SearchPageOutput, TaggedInput} from "../../../../models/common";
import {PositionSearchOutput} from "../../../../models/position.model";
import {SkillSearchOutput} from "../../../../models/skill.model";
import {WorkFromService} from "../../../../services/work-from.service";
import {WorkFromSearchOutput} from "../../../../models/work-from.model";
import {JobCertificate, JobJobLevel, JobPosition, JobSchool, JobSkill, JobWorkFrom} from "../../../../models/job.model";
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
import {finalize} from "rxjs";

export enum FormField {
  skills = "skills",
  positions = "positions",
  certificate = "certificate",
  school = "school",
  workFrom = "workFrom",
  jobLevel = "jobLevel",
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

  constructor(
    private formBuilder: FormBuilder,
    private positionService: PositionService,
    private skillService: SkillService,
    private workFromService: WorkFromService,
    private certificateService: CertificateService,
    private schoolService: SchoolService,
    private jobLevelService: JobLevelService,
    private companyTagService: CompanyTagService,
    private appService: AppService
  ) {
    this.form = this.formBuilder.group({
      [FormField.skills]: [null],
      [FormField.positions]: [null],
      [FormField.certificate]: [null],
      [FormField.school]: [null],
      [FormField.workFrom]: [null],
      [FormField.jobLevel]: [null],
      [FormField.name]: [null, Validators.required],
      [FormField.dateEnd]: [null, Validators.required],
      [FormField.salaryFrom]: [null],
      [FormField.salaryTo]: [null],
      [FormField.yoe]: [null],
      [FormField.companyTag]: [null],
      [FormField.address]: [null],
      [FormField.SkillExperience]: [null, Validators.required],
      [FormField.Description]: [null, Validators.required],
      [FormField.Reason]: [null],
    })
  }

  ngOnInit(): void {
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

  onAddDataPosition = (item: TaggedInput) => {
    const control = this.form.controls[FormField.positions];
    const value: JobPosition[] = control.value || [];
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

  onChangeDataPosition = (item: JobPosition) => {
  }

  onRemoveDataPosition = (item: JobPosition) => {
    const control = this.form.controls[FormField.positions];
    const value: JobPosition[] = control.value || [];
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

  onAddDataSkill = (item: TaggedInput) => {
    const control = this.form.controls[FormField.skills];
    const value: JobSkill[] = control.value || [];
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

  onChangeDataSkill = (item: JobSkill) => {
  }

  onRemoveDataSkill = (item: JobSkill) => {
    const control = this.form.controls[FormField.skills];
    const value: JobSkill[] = control.value || [];
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

  onAddDataCertificate = (item: TaggedInput) => {
    const control = this.form.controls[FormField.certificate];
    const value: JobCertificate[] = control.value || [];
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

  onChangeDataCertificate = (item: JobCertificate) => {
  }

  onRemoveDataCertificate = (item: JobCertificate) => {
    const control = this.form.controls[FormField.certificate];
    const value: JobCertificate[] = control.value || [];
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

  onAddDataSchool = (item: TaggedInput) => {
    const control = this.form.controls[FormField.school];
    const value: JobSchool[] = control.value || [];
    const exists = value.find(it => it.school === item.id);
    if (exists) {
      return;
    }

    value.push({
      school: item.id,
      levelMin: 1,
      levelMax: 10,
      name: item.name
    })
    control.setValue(value);
  }

  onChangeDataSchool = (item: JobSchool) => {
  }

  onRemoveDataSchool = (item: JobSchool) => {
    const control = this.form.controls[FormField.school];
    const value: JobSchool[] = control.value || [];
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
    const value: JobWorkFrom[] = control.value || [];
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

  onRemoveDataWorkFrom(e: JobWorkFrom) {
    const control = this.form.controls[FormField.workFrom];
    const value: JobWorkFrom[] = control.value || [];
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
    const value: JobJobLevel[] = control.value || [];
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

  onChangeDataJobLevel = (item: JobJobLevel) => {
  }

  onRemoveDataJobLevel = (item: JobJobLevel) => {
    const control = this.form.controls[FormField.jobLevel];
    const value: JobJobLevel[] = control.value || [];
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
}
