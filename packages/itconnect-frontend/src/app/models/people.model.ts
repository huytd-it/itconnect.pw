import {PageInput, SearchPageOutput} from "./common";
import {UserInfo} from "./user.model";

export class PeopleSearchLevelRange {
  id?: number; // refactor code
  name: string;
  levelMin: number;
  levelMax: number;
}

export class PeopleSearchBodyOutput {
  yoe: number;
  jobLevel: number[];
  school: string[];
  company: string[];
  certificate: PeopleSearchLevelRange[];
  skill: PeopleSearchLevelRange[];
  position: PeopleSearchLevelRange[];
  includeSelf: boolean;
  addressProvince: number;
  addressDistrict: number;
  addressVillage: number;
}


export class PeopleSearchInput extends PageInput<UserInfo> {}

export class PeopleSearchOutput extends SearchPageOutput {
}
