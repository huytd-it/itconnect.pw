import {Injectable} from "@angular/core";
import {CompanyTagService} from "../../../../../services/company-tag.service";
import {AppService} from "../../../../../services/app.service";
import {CreateTaggedOutput, OptionItem, SearchPageOutput, TaggedInput} from "../../../../../models/common";
import {CompanyTag, CompanyTagSearchOutput} from "../../../../../models/company-tag.model";
import {finalize} from "rxjs";
import {
  JobJobLevelCreateOrEdit,
  JobSchoolCreateOrEdit,
  JobSearchBodyOutput,
  JobSearchLevelRange,
  JobSearchOutput,
  JobStatus,
  JobWorkFromCreateOrEdit
} from "../../../../../models/job.model";
import {PositionService} from "../../../../../services/position.service";
import {SkillService} from "../../../../../services/skill.service";
import {CertificateService} from "../../../../../services/certificate.service";
import {SchoolSearchOutput} from "../../../../../models/school.model";
import {SchoolService} from "../../../../../services/school.service";
import {WorkFromService} from "../../../../../services/work-from.service";
import {JobLevelService} from "../../../../../services/job-level.service";
import {WorkFromSearchOutput} from "../../../../../models/work-from.model";
import {JobLevelSearchOutput} from "../../../../../models/job-level.model";
import {Address} from "../../../../../models/address.model";
import {EasySelectCheckboxComponent} from "../../../../../components/easy-select-checkbox/easy-select-checkbox.component";
import {JobTypeService} from "../../../../../services/job-type.service";
import {JobTypeSearchOutput} from "../../../../../models/job-type.model";

@Injectable()
export class FiltersProvider {
  query: JobSearchOutput = {
    order: 'DESC',
    order_field: 'job.updatedAt'
  };
  position: JobSearchLevelRange[] = [];
  skill: JobSearchLevelRange[] = [];
  certificate: JobSearchLevelRange[] = [];
  school: OptionItem[] = [];
  companyTag: OptionItem[] = [];
  workFrom: OptionItem[] = [];
  jobLevel: OptionItem[] = [];
  jobType: OptionItem[] = [];
  yoe: OptionItem;
  salaryMin: number;
  salaryMax: number;
  address: {
    provinceId: Address,
    districtId: Address,
    villageId: Address
  };

  yoeList = Array.from({ length: 10 }).map((__, index) => ({
    id: index + 1,
    name: `${index + 1}+`
  }))

  constructor(
    private companyTagService: CompanyTagService,
    private positionService: PositionService,
    private skillService: SkillService,
    private certificateService: CertificateService,
    private schoolService: SchoolService,
    private workFromService: WorkFromService,
    private jobLevelService: JobLevelService,
    private jobTypeService: JobTypeService,
    private appService: AppService,
  ) { }

  ngOnInit(): void {
  }

  getBody(): Partial<JobSearchBodyOutput> {
    return {
      position: this.position,
      skill: this.skill,
      certificate: this.certificate,
      school: this.school.map(item => item.name),
      company: this.companyTag.map(item => item.name),
      workFrom: this.workFrom.map(item => item.id),
      jobLevel: this.jobLevel.map(item => item.id),
      jobType: this.jobType.map(item => item.id),
      yoe: this.yoe?.id,
      addressDistrict: this.address?.districtId?.id,
      addressProvince: this.address?.provinceId?.id,
      addressVillage: this.address?.villageId?.id,
      salaryMax: this.salaryMax,
      salaryMin: this.salaryMin,
      status: JobStatus.Publish,
    }
  }

  /**
   * Position
   *
   */
  fetchDataPosition = (query: SearchPageOutput) => {
    return this.positionService.search(query);
  }

  fnAddUserTaggedPosition = (data: CreateTaggedOutput) => {
    return this.positionService.createTag(data);
  }

  onAddDataPosition = (item: TaggedInput) => {
    const value = this.position || [];
    const exists = value.find(it => it.id === item.id);
    if (exists) {
      return;
    }

    value.push({
      id: item.id,
      levelMin: 1,
      levelMax: 10,
      name: item.name
    })
  }

  onRemoveDataPosition = (item: JobSearchLevelRange) => {
    this.position = this.position.filter(it => it.id != item.id);
  }

  /**
   * Position
   *
   */
  fetchDataSkill = (query: SearchPageOutput) => {
    return this.skillService.search(query);
  }

  fnAddUserTaggedSkill = (data: CreateTaggedOutput) => {
    return this.skillService.createTag(data);
  }

  onAddDataSkill = (item: TaggedInput) => {
    const value = this.skill || [];
    const exists = value.find(it => it.id === item.id);
    if (exists) {
      return;
    }

    value.push({
      id: item.id,
      levelMin: 1,
      levelMax: 10,
      name: item.name
    })
  }

  onRemoveDataSkill = (item: JobSearchLevelRange) => {
    this.skill = this.skill.filter(it => it.id != item.id);
  }


  /**
   * Position
   *
   */
  fetchDataCertificate = (query: SearchPageOutput) => {
    return this.certificateService.search(query);
  }

  fnAddUserTaggedCertificate = (data: CreateTaggedOutput) => {
    return this.certificateService.createTag(data);
  }

  onAddDataCertificate = (item: TaggedInput) => {
    const value = this.certificate || [];
    const exists = value.find(it => it.id === item.id);
    if (exists) {
      return;
    }

    value.push({
      id: item.id,
      levelMin: 1,
      levelMax: 10,
      name: item.name
    })
  }

  onRemoveDataCertificate = (item: JobSearchLevelRange) => {
    this.certificate = this.certificate.filter(it => it.id != item.id);
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
    const exists = this.school.find(it => it.id === item.id);
    if (exists) {
      return;
    }
    this.school.push({
      id: item.id,
      name: item.name
    })
  }

  onRemoveDataSchool = (item: JobSchoolCreateOrEdit) => {
    this.school = this.school.filter(it => it.id != item.id);
  }


  /**
   * CompanyTag
   *
   */
  fetchDataCompanyTag = (query: SearchPageOutput) => {
    const qr: CompanyTagSearchOutput = query;
    return this.companyTagService.search(qr);
  }

  fnAddUserTaggedCompanyTag = (data: CreateTaggedOutput) => {
    return this.companyTagService.createTag(data);
  }

  onAddDataCompanyTag = (item: TaggedInput) => {
    const exists = this.companyTag.find(it => it.id === item.id);
    if (exists) {
      return;
    }
    this.companyTag.push({
      id: item.id,
      name: item.name
    })
    this.companyTag = [...this.companyTag];
  }

  onSelectCompany(item: CompanyTag) {
    this.companyTag.push(item);
  }

  onAddCompanyTagString = (name: string, refCompany: EasySelectCheckboxComponent) => {
    this.appService.setHeadLoading(true);
    this.companyTagService.createTag({ name })
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe((data) => {
        this.onAddDataCompanyTag(data);
        refCompany.close();
      })
  }

  onRemoveDataCompanyTag = (item: OptionItem) => {
    this.companyTag = this.companyTag.filter(it => it.id != item.id);
  }


  /**
   * WorkFrom
   *
   */
  fetchDataWorkFrom = (query: SearchPageOutput) => {
    const qr: WorkFromSearchOutput = query;
    return this.workFromService.search(qr);
  }

  onAddDataWorkFrom = (item: TaggedInput) => {
    const exists = this.workFrom.find(it => it.id === item.id);
    if (exists) {
      return;
    }
    this.workFrom.push({
      id: item.id,
      name: item.name
    })
  }

  onRemoveDataWorkFrom = (item: JobWorkFromCreateOrEdit) => {
    this.workFrom = this.workFrom.filter(it => it.id != item.id);
  }

  /**
   * JobLevel
   *
   */
  fetchDataJobLevel = (query: SearchPageOutput) => {
    const qr: JobLevelSearchOutput = query;
    return this.jobLevelService.search(qr);
  }

  onAddDataJobLevel = (item: TaggedInput) => {
    const exists = this.jobLevel.find(it => it.id === item.id);
    if (exists) {
      return;
    }
    this.jobLevel.push({
      id: item.id,
      name: item.name
    })
  }

  onRemoveDataJobLevel = (item: JobJobLevelCreateOrEdit) => {
    this.jobLevel = this.jobLevel.filter(it => it.id != item.id);
  }

  /**
   * Job Type
   *
   */
  fetchDataJobType = (query: SearchPageOutput) => {
    const qr: JobTypeSearchOutput = query;
    return this.jobTypeService.search(qr);
  }

  onAddDataJobType = (item: TaggedInput) => {
    const exists = this.jobType.find(it => it.id === item.id);
    if (exists) {
      return;
    }
    this.jobType.push({
      id: item.id,
      name: item.name
    })
  }

  onRemoveDataJobType = (item: OptionItem) => {
    this.jobType = this.jobType.filter(it => it.id != item.id);
  }
}
