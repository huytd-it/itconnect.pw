import {User} from "./user.model";
import {AppPermission} from "./permission.model";
import {EAddressType} from "./address.model";


export class ProfileDataBoostrap {
  permissions: AppPermission[];
  user: User;
}

export class CompleteUserProfileOutput {
  fullName: string;
  phone: string;
  birthday: Date;
  addressProvince: EAddressType;
  addressDistrict: number;
  addressVillage: number;
  addressStreet: string;
  interest: string;
  objective: string;
  jobLevel: number;
}

export class CompleteUserProfileInput {
  status: boolean
}

export class CompleteCompanyProfileOutput {
  companyMst: string;
  phone: string;
}

export class CompleteCompanyProfileInput {
  status: boolean
}


export class SetAvatarBannerProfileOutput {
  avatar?: number;
  banner?: number;
}
