import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {httpOptions, objectToParams} from "../utils/common";
import {WorkFromSearchInput, WorkFromSearchOutput} from '../models/work-from.model';
import {JobApply, JobApplyCreateInput, JobApplySearchInput, JobApplySearchOutput} from "../models/job-apply.model";
import {JobViewLog, JobViewLogInput} from "../models/job-view-log.model";
import {StatisticOutput} from "../models/common";

@Injectable({
  providedIn: 'root'
})
export class JobViewLogService {

  constructor(
    private httpClient: HttpClient
  ) {}

  create(jobId: number) {
    const uri = 'job-view-log/' + jobId;
    return this.httpClient.put<JobViewLog>(uri, null, httpOptions);
  }

  sts(data: StatisticOutput) {
    const uri = 'job-view-log/sts';
    return this.httpClient.post<JobViewLogInput>(uri, data, httpOptions);
  }
}
