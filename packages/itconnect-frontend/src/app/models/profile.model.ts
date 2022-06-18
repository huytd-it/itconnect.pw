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
  skills: string[]
  positions: string[]
}

export class CompleteUserProfileInput {
  status: boolean
}
