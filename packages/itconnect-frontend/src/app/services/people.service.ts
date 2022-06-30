import { Injectable } from '@angular/core';
import {JobSearchBodyOutput, JobSearchInput, JobSearchOutput} from "../models/job.model";
import {httpOptions, objectToParams} from "../utils/common";
import {HttpClient} from "@angular/common/http";
import {PeopleSearchBodyOutput, PeopleSearchInput, PeopleSearchOutput} from "../models/people.model";
import {UserInfo} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(
    private httpClient: HttpClient
  ) { }

  search(query: PeopleSearchOutput, body: Partial<PeopleSearchBodyOutput>) {
    const uri = 'people/search'
    return this.httpClient.post<PeopleSearchInput>(uri,
      body,
      {
        ...httpOptions,
        params: objectToParams(query)
      }
    );
  }

  getYoe(item: UserInfo) {
    let month = item.computeYoe;
    if (item.computeYoeCurrent) {

    }
    let y = month / 12;
    let m = month % 12;
    let str = [];
    if (y >= 1) {
      str.push(`${Math.round(y)} năm`)
    }
    str.push(`${m} tháng`);
    return str.join(' ')
  }
}
