import { Injectable } from '@angular/core';
import {JobSearchBodyOutput, JobSearchInput, JobSearchOutput} from "../models/job.model";
import {httpOptions, objectToParams} from "../utils/common";
import {HttpClient} from "@angular/common/http";
import {PeopleSearchBodyOutput, PeopleSearchInput, PeopleSearchOutput} from "../models/people.model";

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

}
