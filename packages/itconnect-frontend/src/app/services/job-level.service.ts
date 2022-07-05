import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {httpOptions, objectToParams} from "../utils/common";
import {WorkFromSearchInput, WorkFromSearchOutput} from '../models/work-from.model';
import {JobLevelSearchInput, JobLevelSearchOutput} from "../models/job-level.model";
import {CreateOrEditTagOutput, TaggedInput} from "../models/common";

@Injectable({
  providedIn: 'root'
})
export class JobLevelService {

  constructor(
    private httpClient: HttpClient
  ) {}

  search(query: JobLevelSearchOutput) {
    const uri = 'job-level/search'
    return this.httpClient.get<JobLevelSearchInput>(uri,
      {
        ...httpOptions,
        params: objectToParams(query)
      }
    );
  }

  createOrEdit(data: CreateOrEditTagOutput) {
    const uri = 'job-level/createOrEdit';
    return this.httpClient.post<TaggedInput>(uri, data, httpOptions);
  }
}
