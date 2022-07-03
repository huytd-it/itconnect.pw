import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  Job,
  JobCreateOrEditOutput,
  JobSearchBodyOutput,
  JobSearchInput,
  JobSearchOutput,
  JobStatus
} from "../models/job.model";
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

  delete(id: number) {
    const uri = 'job/' + id;
    return this.httpClient.delete(uri, httpOptions);
  }

  publish(id: number) {
    const uri = 'job/publish/' + id;
    return this.httpClient.put(uri, httpOptions);
  }

  stop(id: number) {
    const uri = 'job/stop/' + id;
    return this.httpClient.put(uri, httpOptions);
  }

  approve(id: number) {
    const uri = 'job/approve/' + id;
    return this.httpClient.put(uri, httpOptions);
  }

  ban(id: number) {
    const uri = 'job/ban/' + id;
    return this.httpClient.put(uri, httpOptions);
  }

  search(query: JobSearchOutput, body: Partial<JobSearchBodyOutput>) {
    const uri = 'job/search'
    return this.httpClient.post<JobSearchInput>(uri,
      body,
      {
        ...httpOptions,
        params: objectToParams(query)
      }
    );
  }

  getById(id: number) {
    const uri = 'job/' + id;
    return this.httpClient.get<Job>(uri, httpOptions);
  }

  getStatusText(status: JobStatus) {
    switch (status) {
      case JobStatus.Draft: return 'nháp';
      case JobStatus.WaitApprove: return 'đang kiểm duyệt';
      case JobStatus.WaitSystem: return 'đang xữ lý';
      case JobStatus.Publish: return 'công khai';
      case JobStatus.Ban: return 'bị khóa';
    }
    return 'không xác định'
  }
}
