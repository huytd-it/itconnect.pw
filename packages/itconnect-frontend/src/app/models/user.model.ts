import {BaseTable} from "./common";
import {AppRole} from "./permission.model";
import {JobLevel} from "./job-level.model";
import {Address} from "./address.model";
import {CompanyInfo} from "./company-info.model";
import {CvWorkExperience} from "./cv-work-experience.model";
import {File} from "./file.model";

export class UserInfo extends BaseTable {
  id: number;
  userId: number;
  banner: File;
  avatar: File;
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
  computeYoe: number;
  computeYoeDate: Date;
  computeYoeCurrent: boolean;
}

export class User extends BaseTable {
  id: number;
  email: string;
  role: AppRole;
  userInfo: UserInfo;
  companyInfo: CompanyInfo;
  cvWorkExperiences: CvWorkExperience[];
  cvWorkExperienceCurrents: CvWorkExperience[];
}


export class UserInfoComputeYoe {
  computeYoe: number;
  computeYoeDate: Date;
  computeYoeCurrent: boolean;
}
