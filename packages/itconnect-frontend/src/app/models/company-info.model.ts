import {BaseTable} from "./common";
import {Address} from "./address.model";
import {File} from "./file.model";

export class CompanyInfo extends BaseTable {
  id: number;
  companyName: string;
  banner: File;
  avatar: File;
  phone: string;
  introduce: string;
  addressProvince: Address;
  addressDistrict: Address;
  addressVillage: Address;
  addressStreet: string;
  mst: string;
  dayEstablish: Date;
}
