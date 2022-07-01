import {BaseTable, PageInput, PageOutput, SearchPageOutput} from "./common";
import {Job} from "./job.model";
import {User} from "./user.model";

export class PointJobUser {
  id: number;
  user: User;
  job: Job;
  pointTotal: number;
  pointSkill: number;
  pointPosition: number;
  pointCertificate: number;
  pointSchool: number;
  pointWorkFrom: number;
  pointLevelJob: number;
  pointLevelType: number;
  pointYoe: number;
}

export class PointJobUserSearchInput extends PageInput<PointJobUser> {
  }

export class PointJobUserSearchOutput extends SearchPageOutput {
  jobId?: number
}


export class JobApplyCreateInput {
}
