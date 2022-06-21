import {PageInput, PageOutput, SearchPageOutput} from "./common";

export class JobLevel {
  id: number;
  name: string;
}

export class JobLevelSearchInput extends PageInput<JobLevel> {}

export class JobLevelSearchOutput extends SearchPageOutput {
}
