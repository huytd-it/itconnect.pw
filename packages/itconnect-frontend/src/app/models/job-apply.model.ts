import {BaseTable, PageInput, PageOutput, SearchPageOutput} from "./common";
import {Job} from "./job.model";
import {User} from "./user.model";

export enum JobApplyStatus {
  Waiting = 'waiting', // for user
  Denide = 'denide', // for company
  RequestJoin = 'request_join', // for company
  RequestDenide = 'request_denide', // for user
  RequestAccept = 'request_accept', // for user
}

export class JobApply extends BaseTable {
  id: number;
  job: Job;
  user: User;
  status: JobApplyStatus;
}

export class JobApplySearchInput extends PageInput<JobApply> {
  search: string;
  jobId: number;
}

export class JobApplySearchOutput extends SearchPageOutput {
  jobId?: number
}


export class JobApplyCreateOutput {
  id?: number;
  jobId?: number;
  status?: JobApplyStatus;
}

export class JobApplyStsInput {
  legend: string;
  countApply: number;
}
