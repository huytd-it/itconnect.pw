import {PageInput, PageOutput, SearchPageOutput} from "./common";

export class Address {
  id: number;
  name: string;
  parentId: number;
}

export class AddressSearchInput extends PageInput<Address> {}

export class AddressSearchOutput extends SearchPageOutput {
  parentId?: number;
}
