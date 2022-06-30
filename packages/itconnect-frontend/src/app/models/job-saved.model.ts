import {BaseTable, PageInput, PageOutput, SearchPageOutput} from "./common";
import {Job} from "./job.model";
import {User} from "./user.model";

export class JobSaved extends BaseTable {
  id: number;
  job: Job;
  user: User;
}

export class JobSavedSearchInput extends PageInput<JobSaved> {
  jobId: number;
}

export class JobSavedSearchOutput extends SearchPageOutput {
}


export class JobSavedCreateInput {
  jobId: number
}
