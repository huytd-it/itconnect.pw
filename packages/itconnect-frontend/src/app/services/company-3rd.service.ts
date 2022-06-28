import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {httpOptions, objectToParams} from "../utils/common";
import {Company3rdSearchInput, Company3rdSearchOutput} from "../models/company-3rd.model";

@Injectable({
  providedIn: 'root'
})
export class Company3rdService {

  constructor(
    private httpClient: HttpClient
  ) {}

  search(query: Company3rdSearchOutput) {
    const uri = 'company-3rd/search'
    return this.httpClient.get<Company3rdSearchInput>(uri,
      {
        ...httpOptions,
        params: objectToParams(query)
      }
    );
  }
}
