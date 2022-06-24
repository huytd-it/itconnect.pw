import {PageInput, PageOutput, SearchPageOutput} from "./common";

export class WorkFrom {
  id: number;
  name: string;

  // add more
}

export class WorkFromSearchInput extends PageInput<WorkFrom> {}

export class WorkFromSearchOutput extends SearchPageOutput {
}
