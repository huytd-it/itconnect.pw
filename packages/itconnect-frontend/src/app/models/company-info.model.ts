import {BaseTable} from "./common";
import {Address} from "./address.model";

export class CompanyInfo extends BaseTable {
  id: number;
  companyName: string;
  addressProvince: Address;
  addressDistrict: Address;
  addressVillage: Address;
  addressStreet: string;
  mst: string;
  dayEstablish: Date;
}
