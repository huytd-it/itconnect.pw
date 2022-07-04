import {BaseTable, PageInput, PageOutput, SearchPageOutput} from "./common";
import {Job} from "./job.model";
import {User} from "./user.model";

export class JobApply extends BaseTable {
  id: number;
  job: Job;
  user: User;
}

export class JobApplySearchInput extends PageInput<JobApply> {
  search: string;
  jobId: number;
}

export class JobApplySearchOutput extends SearchPageOutput {
  jobId?: number
}


export class JobApplyCreateInput {
}

export class JobApplyStsInput {
  legend: string;
  countApply: number;
}
