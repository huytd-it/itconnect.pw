import {PageInput, PageOutput, SearchPageOutput} from "./common";

export class Company3rd {
  id: number;
  name: string;
  code: string;
  date: Date;
  address: string;
  realName: string;
}

export class Company3rdSearchInput extends PageInput<Company3rd> {}

export class Company3rdSearchOutput extends SearchPageOutput {
}
