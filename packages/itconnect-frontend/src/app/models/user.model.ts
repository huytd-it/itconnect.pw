import {BaseTable} from "./common";
import {AppRole} from "./permission.model";
import {JobLevel} from "./job-level.model";
import {Address} from "./address.model";

export class UserInfo {
  id: number;
  userId: number;
  addressProvince: Address;
  addressDistrict: Address;
  addressVillage: Address;
  addressStreet: string;
  phone: string;
  fullName: string;
  birthday: Date;
  interest: string;
  objective: string;
  jobLevel: JobLevel;
}

export class User extends BaseTable {
  id: number;
  email: string;
  role: AppRole;
  userInfo: UserInfo;
}
