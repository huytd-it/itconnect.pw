import {PageInput, PageOutput, SearchPageOutput} from "./common";

export class School {
  id: number;
  name: string;
  jobSchoolCount: number;
  userSchoolCount: number;
  cvEducationCount: number;
  // add more
}

export class SchoolSearchInput extends PageInput<School> {}

export class SchoolSearchOutput extends SearchPageOutput {
}
