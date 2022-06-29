import {PageInput, PageOutput, SearchPageOutput} from "./common";
import {Job} from "./job.model";
import {User} from "./user.model";

export class JobApply {
  id: number;
  job: Job;
  user: User;
}

export class JobApplySearchInput extends PageInput<JobApply> {
  search: string;
  jobId: number;
}

export class JobApplySearchOutput extends SearchPageOutput {
}


export class JobApplyCreateInput {
  jobId: number
}
