import { Component, OnInit } from '@angular/core';
import {AddressService} from "../../../../services/address.service";
import {SearchPageOutput} from "../../../../models/common";
import {AddressSearchOutput} from "../../../../models/address.model";

@Component({
  selector: 'app-input-address',
  templateUrl: './input-address.component.html',
  styleUrls: ['./input-address.component.scss']
})
export class InputAddressComponent implements OnInit {
  test = ['hello 1', 'hello 2']

  constructor(
    private addressService: AddressService,
  ) {
  }

  ngOnInit(): void {
  }

  fetchData = (query: SearchPageOutput) => {
    const queryAddress: AddressSearchOutput = query;
    return this.addressService.search(queryAddress);
  }
}
