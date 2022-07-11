import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {httpOptions, objectToParams} from "../utils/common";
import {WorkFromSearchInput, WorkFromSearchOutput} from '../models/work-from.model';
import {RankedAcademicSearchInput, RankedAcademicSearchOutput} from "../models/ranked-academic.model";
import {CreateOrEditTagOutput, TaggedInput} from "../models/common";

@Injectable({
  providedIn: 'root'
})
export class RankedAcademicService {

  constructor(
    private httpClient: HttpClient
  ) {}

  search(query: RankedAcademicSearchOutput) {
    const uri = 'ranked-academic/search'
    return this.httpClient.get<RankedAcademicSearchInput>(uri,
      {
        ...httpOptions,
        params: objectToParams(query)
      }
    );
  }

  createOrEdit(data: CreateOrEditTagOutput) {
    const uri = 'ranked-academic/createOrEdit';
    return this.httpClient.post<TaggedInput>(uri, data, httpOptions);
  }
}
