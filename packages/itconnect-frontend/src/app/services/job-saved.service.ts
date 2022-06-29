import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {httpOptions, objectToParams} from "../utils/common";
import {JobSaved, JobSavedCreateInput, JobSavedSearchInput, JobSavedSearchOutput} from "../models/job-saved.model";

@Injectable({
  providedIn: 'root'
})
export class JobSavedService {

  constructor(
    private httpClient: HttpClient
  ) {}

  search(query: JobSavedSearchInput) {
    const uri = 'job-saved/search'
    return this.httpClient.get<JobSavedSearchOutput>(uri,
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
}
