import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PositionService} from "../../../../services/position.service";
import {SkillService} from "../../../../services/skill.service";
import {AppService} from "../../../../services/app.service";
import {Approve, CreateTaggedOutput, SearchPageOutput, TaggedInput} from "../../../../models/common";
import {PositionSearchOutput} from "../../../../models/position.model";
import {SkillSearchOutput} from "../../../../models/skill.model";
import {WorkFromService} from "../../../../services/work-from.service";
import {WorkFromSearchOutput} from "../../../../models/work-from.model";
import {
  Job,
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
import {faArrowDown, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {JobLevelService} from "../../../../services/job-level.service";
import {JobLevelSearchOutput} from "../../../../models/job-level.model";
import {CompanyTagService} from "../../../../services/company-tag.service";
import {EasySelectComponent} from "../../../../components/easy-select/easy-select.component";
import {finalize} from "rxjs";
import * as moment from "moment";
import {JobService} from "../../../../services/job.service";
import {JobTypeService} from "../../../../services/job-type.service";
import {JobTypeSearchOutput} from "../../../../models/job-type.model";
import {ActivatedRoute, Router} from "@angular/router";
import {MappingNameToParentPipe} from "../../../../utils/pipes/mappingNameToParent.pipe";
import {Options} from "@angular-slider/ngx-slider";

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
  Description = 'Description',
  SkillExperience = 'SkillExperience',
  Reason = 'Reason',
  pointSkill = 'pointSkill',
  pointPosition = 'pointPosition',
  pointCertificate = 'pointCertificate',
  pointSchool = 'pointSchool',
  pointWorkFrom = 'pointWorkFrom',
  pointLevelJob = 'pointLevelJob',
  pointLevelType = 'pointLevelType',
  pointYoe = 'pointYoe',
  size = 'size'
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnChanges {
  @ViewChild('selectCompany') selectCompany: EasySelectComponent;
  @Input() idShow: number;
  form: FormGroup;
  faArrowRight = faArrowRight;
  faArrowDown = faArrowDown;
  yoeList = Array.from({ length: 10 }).map((__, index) => ({
      id: index + 1,
      name: `${index + 1}+`
  }))
  jobEdit: Job | undefined;

  readonly minPoint = 10;
  readonly maxPoint = 20;
  options: Options = {
    floor: this.minPoint,
    ceil: this.maxPoint,
    step: 1,
    showTicks: false,
    showSelectionBar: true,
    getPointerColor: value => 'var(--primary)',
    getTickColor: value => '#d8e0f3',
    getSelectionBarColor: value => 'var(--primary)',
  };


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
    private mappingNameToParentPipe: MappingNameToParentPipe
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
      [FormField.SkillExperience]: [null, Validators.required],
      [FormField.Description]: [null, Validators.required],
      [FormField.Reason]: [null],
      [FormField.pointSkill]: [this.minPoint],
      [FormField.pointPosition]: [this.minPoint],
      [FormField.pointCertificate]: [this.minPoint],
      [FormField.pointSchool]: [this.minPoint],
      [FormField.pointWorkFrom]: [this.minPoint],
      [FormField.pointLevelJob]: [this.minPoint],
      [FormField.pointLevelType]: [this.minPoint],
      [FormField.pointYoe]: [this.minPoint],
      [FormField.size]: [null, [Validators.min(1), Validators.max(100)]],
    }, {
      validators: this.customValidate
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    const {idShow} = changes;
    if (idShow && idShow.currentValue && idShow.currentValue != idShow.previousValue) {
      setTimeout(() => {
        this.loadEdit(this.idShow);
        this.form.disable();
        this.options = {
          ...this.options,
          readOnly: true
        }
      })
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.loadEdit(data['id']);
    })
  }

  loadEdit(jobId: number) {
    this.jobEdit = undefined;
    if (!jobId) {
      return;
    }
    this.appService.setHeadLoading(true);
    this.jobService.getById(jobId)
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.jobEdit = data;
        this.form.setValue({
          [FormField.skills]: this.mappingNameToParentPipe.transform(data.jobSkills, 'skill'),
          [FormField.positions]: this.mappingNameToParentPipe.transform(data.jobPositions, 'position'),
          [FormField.certificate]: this.mappingNameToParentPipe.transform(data.jobCertificates, 'certificate'),
          [FormField.school]: this.mappingNameToParentPipe.transform(data.jobSchools, 'school'),
          [FormField.workFrom]: this.mappingNameToParentPipe.transform(data.jobWorkFrom, 'workFrom'),
          [FormField.jobLevel]: this.mappingNameToParentPipe.transform(data.jobJobLevels, 'jobLevel'),
          [FormField.jobType]: data.jobType,
          [FormField.name]: data.name,
          [FormField.dateEnd]: data.endDate,
          [FormField.salaryFrom]: data.salaryMin,
          [FormField.salaryTo]: data.salaryMax,
          [FormField.yoe]: data.yoe ? { id: data.yoe, name: data.yoe + '+' } : null,
          [FormField.SkillExperience]: data.requirementContent,
          [FormField.Description]: data.descriptionContent,
          [FormField.Reason]: data.reasonContent,
          [FormField.pointSkill]: data.pointSkill,
          [FormField.pointPosition]: data.pointPosition,
          [FormField.pointCertificate]: data.pointCertificate,
          [FormField.pointSchool]: data.pointSchool,
          [FormField.pointWorkFrom]: data.pointWorkFrom,
          [FormField.pointLevelJob]: data.pointLevelJob,
          [FormField.pointLevelType]: data.pointLevelType,
          [FormField.pointYoe]: data.pointYoe,
          [FormField.size]: data.size || null
        })
      })
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
    // qr.approve = Approve.True;
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
    // qr.approve = Approve.True;
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
    // qr.approve = Approve.True;
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
    // qr.approve = Approve.True;
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
    const data: JobCreateOrEditOutput = {
      jobPositions: value[FormField.positions],
      jobSkills: value[FormField.skills],
      jobCertificates: value[FormField.certificate],
      jobSchools: value[FormField.school],
      jobWorkFrom: value[FormField.workFrom],
      jobJobLevels: value[FormField.jobLevel],
      jobType: value[FormField.jobType]?.id,
      salaryMin: value[FormField.salaryTo] && Number(value[FormField.salaryFrom]),
      salaryMax: value[FormField.salaryTo] && Number(value[FormField.salaryTo]),
      name: value[FormField.name],
      yoe: value[FormField.yoe]?.id,
      endDate: value[FormField.dateEnd],
      descriptionContent: value[FormField.Description],
      requirementContent: value[FormField.SkillExperience],
      reasonContent: value[FormField.Reason],
      pointSkill: value[FormField.pointSkill],
      pointPosition: value[FormField.pointPosition],
      pointCertificate: value[FormField.pointCertificate],
      pointSchool: value[FormField.pointSchool],
      pointWorkFrom: value[FormField.pointWorkFrom],
      pointLevelJob: value[FormField.pointLevelJob],
      pointLevelType: value[FormField.pointLevelType],
      pointYoe: value[FormField.pointYoe],
      size: Number(value[FormField.size])
    }

    if (this.jobEdit) {
      data.id = this.jobEdit.id;
    }

    this.appService.setHeadLoading(true);
    this.jobService.createOrEdit(data, true, isDraft)
      .pipe(finalize(() => {
        this.appService.setHeadLoading(false);
      }))
      .subscribe((data) => {
        this.router.navigate(['/u/jobs/manage', data.id.toString()]).then(() => {})
      })
  }
}
