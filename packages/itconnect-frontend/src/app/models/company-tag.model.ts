import {PageInput, PageOutput, SearchPageOutput} from "./common";
import {CompanyInfo} from "./company-info.model";

export class CompanyTag {
  id: number;
  name: string;
  mst: string;
  isApprove: boolean;
  companyInfo: CompanyInfo;
}

export class CompanyTagSearchInput extends PageInput<CompanyTag> {}

export class CompanyTagSearchOutput extends SearchPageOutput {
}


export class CompanyTagAddMstOutput {
  mst: string;
}
