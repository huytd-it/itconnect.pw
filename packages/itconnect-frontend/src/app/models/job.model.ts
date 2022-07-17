import {BaseTable, PageInput, SearchPageOutput} from "./common";
import {Address} from "./address.model";
import {CompanyTag} from "./company-tag.model";
import {Position} from "./position.model";
import {Skill} from "./skill.model";
import {Certificate} from "./certificate.model";
import {School} from "./school.model";
import {WorkFrom} from "./work-from.model";
import {User} from "./user.model";
import {JobLevel} from "./job-level.model";
import {JobType} from "./job-type.model";

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
  jobLevel: JobLevel;
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
  jobType: JobType;
  companyTag: CompanyTag;
  salaryMin: number;
  salaryMax: number;
  yoe: number;
  name: string;
  endDate: Date;
  descriptionContent: string;
  requirementContent: string;
  reasonContent: string;
  status: JobStatus;
  user: User;
  jobApplyCount: number;
  jobApplySelf: number;
  jobSavedSelf: number;
  jobViewLogCount: number;
  jobUniqueViewLogCount: number;
  pointPosition: number;
  pointSkill: number;
  pointCertificate: number;
  pointSchool: number;
  pointWorkFrom: number;
  pointLevelJob: number;
  pointLevelType: number;
  pointYoe: number;
  size: number;
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
  jobType?: number;
  companyTag?: number;
  salaryMin?: number;
  salaryMax?: number;
  yoe?: number;
  name: string;
  endDate: Date;
  descriptionContent: string;
  requirementContent: string;
  reasonContent?: string;
  pointPosition: number;
  pointSkill: number;
  pointCertificate: number;
  pointSchool: number;
  pointWorkFrom: number;
  pointLevelJob: number;
  pointLevelType: number;
  pointYoe: number;
  size: number;
}

export enum JobStatus {
  Draft = 1,
  WaitApprove = 2,
  WaitSystem = 3,
  Publish = 4,
  Ban = 5
}


export class JobSearchLevelRange {
  id?: number; // refactor code
  name: string;
  levelMin: number;
  levelMax: number;
}

export class JobSearchBodyOutput {
  yoe: number;
  jobLevel: number[];
  jobType: number[];
  workFrom: number[];
  school: string[];
  company: string[];
  certificate: JobSearchLevelRange[];
  skill: JobSearchLevelRange[];
  position: JobSearchLevelRange[];
  status: JobStatus;
  includeJobExpired: boolean;
  salaryMin: number;
  salaryMax: number;
  addressProvince: number;
  addressDistrict: number;
  addressVillage: number;
}


export class JobSearchInput extends PageInput<Job> {}

export class JobSearchOutput extends SearchPageOutput {
}

export class JobSts1Input {
  legend: string;
  countJobPublish: number;
  countJobWaitApprove: number;
  countJobBan: number;
  countJobDraft: number;
}


export class JobSts2Input {
  legend: string;
  countJobEnd: number;
}

export class JobSts3Input {
  legend: string;
  countJob: number;
}
