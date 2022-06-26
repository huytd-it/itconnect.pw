import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Job, JobCreateOrEditOutput, JobSearchBodyOutput, JobSearchInput, JobSearchOutput} from "../models/job.model";
import {httpOptions, objectToParams} from "../utils/common";
import {JobLevelSearchInput, JobLevelSearchOutput} from "../models/job-level.model";

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  createOrEdit(data: JobCreateOrEditOutput, hasResponseEntity = false, saveDraft = false) {
    const uri = 'job/createOrEdit';
    return this.httpClient.post<Job>(uri, data, {
      ...httpOptions,
      params: {
        hasResponseEntity: hasResponseEntity.toString(),
        saveDraft: saveDraft.toString()
      }
    });
  }

  search(query: JobSearchOutput, body: JobSearchBodyOutput) {
    const uri = 'job/search'
    return this.httpClient.post<JobSearchInput>(uri,
      body,
      {
        ...httpOptions,
        params: objectToParams(query)
      }
    );
  }
}
