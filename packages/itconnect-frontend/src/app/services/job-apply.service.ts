import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {httpOptions, objectToParams} from "../utils/common";
import {WorkFromSearchInput, WorkFromSearchOutput} from '../models/work-from.model';
import {
  JobApply,
  JobApplyCreateInput,
  JobApplySearchInput,
  JobApplySearchOutput,
  JobApplyStsInput
} from "../models/job-apply.model";
import {StatisticOutput} from "../models/common";
import {JobViewLogStsInput} from "../models/job-view-log.model";

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

  sts(data: StatisticOutput) {
    const uri = 'job-apply/sts';
    return this.httpClient.post<JobApplyStsInput[]>(uri, data, httpOptions);
  }

  formatSts(data: JobApplyStsInput[]) {
    return data.map(item => ({
      ...item,
      countApply: Number(item.countApply) || 0,
    }))
  }

}
