import {PageInput, PageOutput, SearchPageOutput} from "./common";

export class JobType {
  id: number;
  name: string;
}

export class JobTypeSearchInput extends PageInput<JobType> {}

export class JobTypeSearchOutput extends SearchPageOutput {
}
