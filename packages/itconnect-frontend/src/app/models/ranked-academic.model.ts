import {PageInput, PageOutput, SearchPageOutput} from "./common";

export class RankedAcademic {
  id: number;
  name: string;

  // add more
}

export class RankedAcademicSearchInput extends PageInput<RankedAcademic> {}

export class RankedAcademicSearchOutput extends SearchPageOutput {
}
