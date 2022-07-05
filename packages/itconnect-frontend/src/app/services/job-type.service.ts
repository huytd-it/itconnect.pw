import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {httpOptions, objectToParams} from "../utils/common";
import {JobTypeSearchInput, JobTypeSearchOutput} from "../models/job-type.model";
import {CreateOrEditTagOutput, TaggedInput} from "../models/common";

@Injectable({
  providedIn: 'root'
})
export class JobTypeService {

  constructor(
    private httpClient: HttpClient
  ) {}

  search(query: JobTypeSearchOutput) {
    const uri = 'job-type/search'
    return this.httpClient.get<JobTypeSearchInput>(uri,
      {
        ...httpOptions,
        params: objectToParams(query)
      }
    );
  }

  createOrEdit(data: CreateOrEditTagOutput) {
    const uri = 'job-type/createOrEdit';
    return this.httpClient.post<TaggedInput>(uri, data, httpOptions);
  }
}
