import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {httpOptions, objectToParams} from "../utils/common";
import {
  JobSaved,
  JobSavedCreateInput,
  JobSavedSearchInput,
  JobSavedSearchOutput,
  JobSavedStsInput
} from "../models/job-saved.model";
import {StatisticOutput} from "../models/common";
import {JobApplyStsInput} from "../models/job-apply.model";

@Injectable({
  providedIn: 'root'
})
export class JobSavedService {

  constructor(
    private httpClient: HttpClient
  ) {}

  search(query: JobSavedSearchOutput) {
    const uri = 'job-saved/search'
    return this.httpClient.get<JobSavedSearchInput>(uri,
      {
        ...httpOptions,
        params: objectToParams(query)
      }
    );
  }

  create(body: JobSavedCreateInput) {
    const uri = 'job-saved/create'
    return this.httpClient.post<JobSaved>(uri, body, httpOptions);
  }

  delete(id: number) {
    const uri = 'job-saved/'+id;
    return this.httpClient.delete(uri, httpOptions);
  }

  deleteByJobId(id: number) {
    const uri = 'job-saved/byJobId/'+id;
    return this.httpClient.delete(uri, httpOptions);
  }

  sts(data: StatisticOutput) {
    const uri = 'job-saved/sts';
    return this.httpClient.post<JobSavedStsInput[]>(uri, data, httpOptions);
  }

  formatSts(data: JobSavedStsInput[]) {
    return data.map(item => ({
      ...item,
      countSaved: Number(item.countSaved) || 0,
    }))
  }
}
