import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  Job,
  JobCreateOrEditOutput,
  JobSearchBodyOutput,
  JobSearchInput,
  JobSearchOutput,
  JobStatus, JobSts1Input, JobSts2Input, JobSts3Input
} from "../models/job.model";
import {httpOptions, objectToParams} from "../utils/common";
import {JobLevelSearchInput, JobLevelSearchOutput} from "../models/job-level.model";
import {StatisticOutput} from "../models/common";
import {JobApplyStsInput} from "../models/job-apply.model";

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

  sts1(data: StatisticOutput) {
    const uri = 'job/sts1';
    return this.httpClient.post<JobSts1Input[]>(uri, data, httpOptions);
  }

  sts2(data: StatisticOutput) {
    const uri = 'job/sts2';
    return this.httpClient.post<JobSts2Input[]>(uri, data, httpOptions);
  }

  sts3(data: StatisticOutput) {
    const uri = 'job/sts3';
    return this.httpClient.post<JobSts3Input[]>(uri, data, httpOptions);
  }

  formatSts1(data: JobSts1Input[]) {
    return data.map(item => ({
      ...item,
      countJobBan: Number(item.countJobBan) || 0,
      countJobDraft: Number(item.countJobDraft) || 0,
      countJobPublish: Number(item.countJobPublish) || 0,
      countJobWaitApprove: Number(item.countJobWaitApprove) || 0,
    }))
  }

  formatSts2(data: JobSts2Input[]) {
    return data.map(item => ({
      ...item,
      countJobEnd: Number(item.countJobEnd) || 0,
    }))
  }

  formatSts3(data: JobSts3Input[]) {
    return data.map(item => ({
      ...item,
      countJob: Number(item.countJob) || 0,
    }))
  }

}
