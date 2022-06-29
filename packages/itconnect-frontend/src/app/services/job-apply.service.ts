import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {httpOptions, objectToParams} from "../utils/common";
import {WorkFromSearchInput, WorkFromSearchOutput} from '../models/work-from.model';
import {JobApply, JobApplyCreateInput, JobApplySearchInput, JobApplySearchOutput} from "../models/job-apply.model";

@Injectable({
  providedIn: 'root'
})
export class JobApplyService {

  constructor(
    private httpClient: HttpClient
  ) {}

  search(query: JobApplySearchOutput) {
    const uri = 'job-apply/search'
    return this.httpClient.get<JobApplySearchInput>(uri,
      {
        ...httpOptions,
        params: objectToParams(query)
      }
    );
  }

  create(body: JobApplyCreateInput) {
    const uri = 'job-apply/create'
    return this.httpClient.post<JobApply>(uri, body, httpOptions);
  }

  delete(id: number) {
    const uri = 'job-apply/'+id;
    return this.httpClient.delete(uri, httpOptions);
  }
}
