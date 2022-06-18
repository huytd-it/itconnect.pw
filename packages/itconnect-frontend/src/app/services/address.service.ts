import { Injectable } from '@angular/core';
import {AddressSearchInput, AddressSearchOutput} from "../models/address.model";
import {HttpClient} from "@angular/common/http";
import {httpOptions, objectToParams} from "../utils/common";

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(
    private httpClient: HttpClient
  ) {}

  search(query: AddressSearchOutput) {
    const uri = 'address/search'
    return this.httpClient.get<AddressSearchInput>(uri,
      {
        ...httpOptions,
        params: objectToParams(query)
      }
    );
  }
}
