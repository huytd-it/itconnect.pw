import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {httpOptions, objectToParams} from "../utils/common";
import {WorkFromSearchInput, WorkFromSearchOutput} from '../models/work-from.model';
import {CreateOrEditTagOutput, TaggedInput} from "../models/common";

@Injectable({
  providedIn: 'root'
})
export class WorkFromService {

  constructor(
    private httpClient: HttpClient
  ) {}

  search(query: WorkFromSearchOutput) {
    const uri = 'work-from/search'
    return this.httpClient.get<WorkFromSearchInput>(uri,
      {
        ...httpOptions,
        params: objectToParams(query)
      }
    );
  }

  createOrEdit(data: CreateOrEditTagOutput) {
    const uri = 'work-from/createOrEdit';
    return this.httpClient.post<TaggedInput>(uri, data, httpOptions);
  }
}
