import {BaseTable} from "./common";
import {Address} from "./address.model";
import {CompanyTag} from "./company-tag.model";
import {Position} from "./position.model";
import {Skill} from "./skill.model";
import {Certificate} from "./certificate.model";
import {School} from "./school.model";
import {WorkFrom} from "./work-from.model";
import {User} from "./user.model";

export class jobTagRange {
  id?: number;
  levelMax: number;
  levelMin: number;
  name?: string; // refactor
}


export class JobPositionCreateOrEdit extends jobTagRange {
  position: number;
}

export class JobPosition extends jobTagRange {
  position: Position;
}

export class JobSkillCreateOrEdit extends jobTagRange {
  skill: number;
}

export class JobSkill extends jobTagRange {
  skill: Skill;
}

export class JobCertificateCreateOrEdit extends jobTagRange {
  certificate: number;
}

export class JobCertificate extends jobTagRange {
  certificate: Certificate;
}

export class JobSchoolCreateOrEdit {
  id?: number;
  name: string; // refactor
  school: number;
}

export class JobSchool {
  id?: number;
  name: string; // refactor
  school: School;
}

export class JobWorkFromCreateOrEdit {
  id?: number;
  workFrom: number;
  name: string; // refactor
}

export class JobWorkFrom {
  id: number;
  workFrom: WorkFrom;
  name: string; // refactor
}

export class JobJobLevelCreateOrEdit {
  id?: number;
  jobLevel: number;
  name: string; // refactor
}

export class JobJobLevel {
  id: number;
  jobLevel: number;
  name: string; // refactor
}

export class Job extends BaseTable {
  id: number;
  addressProvince: Address;
  addressVillage: Address;
  addressDistrict: Address;
  addressStreet: string;
  jobPositions: JobPosition[];
  jobSkills: JobSkill[];
  jobCertificates: JobCertificate[];
  jobSchools: JobSchool[];
  jobWorkFrom: JobWorkFrom[];
  jobJobLevels: JobJobLevel[];
  companyTag: CompanyTag;
  salaryMin: number;
  salaryMax: number;
  yoe: number;
  name: string;
  endDate: Date;
  descriptionContent: string;
  requirementContent: string;
  reasonContent: string;
  status: 0;
  user: User;
}
export class JobCreateOrEditOutput {
  id?: number;
  addressProvince?: number;
  addressDistrict?: number;
  addressVillage?: number;
  addressStreet?: string;
  jobPositions?: JobPositionCreateOrEdit[];
  jobSkills?: JobSkillCreateOrEdit[];
  jobCertificates?: JobCertificateCreateOrEdit[];
  jobSchools?: JobSchoolCreateOrEdit[];
  jobWorkFrom?: JobWorkFromCreateOrEdit[];
  jobJobLevels?: JobJobLevelCreateOrEdit[];
  companyTag?: number;
  salaryMin?: number;
  salaryMax?: number;
  yoe?: number;
  name: string;
  endDate: Date;
  descriptionContent: string;
  requirementContent: string;
  reasonContent?: string;
}
