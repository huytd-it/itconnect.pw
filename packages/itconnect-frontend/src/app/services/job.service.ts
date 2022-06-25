import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Job, JobCreateOrEditOutput} from "../models/job.model";
import {httpOptions} from "../utils/common";

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
}
