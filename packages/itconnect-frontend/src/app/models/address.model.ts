import {PageInput, PageOutput, SearchPageOutput} from "./common";


export enum EAddressType {
  province = 1,
  district = 2,
  village = 3
}

export class Address {
  id: number;
  name: string;
  type: EAddressType;
  parentId: number;
}

export class AddressSearchInput extends PageInput<Address> {}

export class AddressSearchOutput extends SearchPageOutput {
  parentId?: number;
  type?: EAddressType;
}
