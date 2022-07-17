import {Injectable} from "@angular/core";
import {CompanyTagService} from "../../../../../services/company-tag.service";
import {AppService} from "../../../../../services/app.service";
import {CreateTaggedOutput, OptionItem, SearchPageOutput, TaggedInput} from "../../../../../models/common";
import {CompanyTag, CompanyTagSearchOutput} from "../../../../../models/company-tag.model";
import {finalize, map} from "rxjs";
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
import {JobLevelSearchOutput} from "../../../../../models/job-level.model";
import {Address} from "../../../../../models/address.model";
import {EasySelectCheckboxComponent} from "../../../../../components/easy-select-checkbox/easy-select-checkbox.component";
import {JobTypeService} from "../../../../../services/job-type.service";
import {PeopleSearchBodyOutput, PeopleSearchOutput} from "../../../../../models/people.model";
import {Params} from "@angular/router";

@Injectable()
export class FiltersProvider {
  query: PeopleSearchOutput = {};
  position: JobSearchLevelRange[] = [];
  skill: JobSearchLevelRange[] = [];
  certificate: JobSearchLevelRange[] = [];
  school: OptionItem[] = [];
  companyTag: OptionItem[] = [];
  jobLevel: OptionItem[] = [];
  yoe: OptionItem;
  address: {
    provinceId: Address,
    districtId: Address,
    villageId: Address
  };

  yoeList = Array.from({ length: 10 }).map((__, index) => ({
    id: index + 1,
    name: `${index + 1}+`
  }))

  orderFields = [
    {
      name: 'Ngày gia nhập',
      value: 'user.createdAt'
    },
    {
      name: 'Công ty',
      value: 'companyTag.name'
    },
    {
      name: 'Vị trí',
      value: 'position.name'
    },
    {
      name: 'Kỹ năng',
      value: 'skill.name'
    },
    {
      name: 'Văn bằng',
      value: 'certificate.name'
    },
    {
      name: 'Trường học',
      value: 'school.name'
    },
    {
      name: 'Địa chỉ (Thành phố/Tỉnh)',
      value: 'addressProvince.name'
    },
    {
      name: 'Địa chỉ (Quận/Huyện)',
      value: 'addressDistrict.name'
    },
    {
      name: 'Địa chỉ (Phường/Xã)',
      value: 'addressVillage.name'
    },
  ]
  orders = [
    {
      name: 'Tăng dần',
      value: 'ASC'
    },
    {
      name: 'Giảm dần',
      value: 'DESC'
    },
  ]
  orderFieldSelected: { value: string } = this.orderFields[0];
  orderSelected: { value: string } = this.orders[1];

  miniSearch: {
    name: string,
    type: string,
    value: string
  } | undefined;

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

  getQuery(): PeopleSearchOutput {
    return {
      ...this.query,
      order: this.orderSelected.value as any,
      order_field: this.orderFieldSelected.value
    }
  }

  getBody(): Partial<PeopleSearchBodyOutput> {
    return {
      position: this.position,
      skill: this.skill,
      certificate: this.certificate,
      school: this.school.map(item => item.name),
      company: this.companyTag.map(item => item.name),
      jobLevel: this.jobLevel.map(item => item.id),
      yoe: this.yoe?.id,
      addressDistrict: this.address?.districtId?.id,
      addressProvince: this.address?.provinceId?.id,
      addressVillage: this.address?.villageId?.id,
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


  searchMiniFilter(query: Params) {
    const {
      position,
      skill
    } = query;

    if (position) {
      this.miniSearch = {
        name: 'vị trí',
        type: 'position',
        value: position
      }
      return this.fetchDataPosition({
        search: position
      }).pipe(map(data => {
        const d = data?.data?.[0];
        if (d) {
          this.position.push({
            id: d.id,
            name: d.name,
            levelMin: 1,
            levelMax: 10
          })
        }
      }));
    }

    if (skill) {
      this.miniSearch = {
        name: 'kỹ năng',
        type: 'skill',
        value: skill
      }
      return this.fetchDataSkill({
        search: skill
      }).pipe(map(data => {
        const d = data?.data?.[0];
        if (d) {
          this.skill.push({
            id: d.id,
            name: d.name,
            levelMin: 1,
            levelMax: 10
          })
        }
      }));
    }

    return null;
  }

  deleteMiniFilter() {
    if (!this.miniSearch) {
      return
    }
    switch (this.miniSearch.type) {
      case 'skill':
        this.skill = this.skill.filter(item => item.name != this.miniSearch?.value);
        break;

      case 'position':
        this.position = this.position.filter(item => item.name != this.miniSearch?.value);
        break;
    }
    this.miniSearch = undefined;
  }
}
