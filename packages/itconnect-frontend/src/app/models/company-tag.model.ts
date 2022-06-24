import {PageInput, PageOutput, SearchPageOutput} from "./common";

export class CompanyTag {
  id: number;
  name: string;

  // add more
}

export class CompanyTagSearchInput extends PageInput<CompanyTag> {}

export class CompanyTagSearchOutput extends SearchPageOutput {
}
