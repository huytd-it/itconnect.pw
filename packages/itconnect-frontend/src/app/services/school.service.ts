import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {httpOptions, objectToParams} from "../utils/common";
import {SkillSearchInput, SkillSearchOutput} from "../models/skill.model";
import {CreateTaggedOutput, TaggedInput} from "../models/common";
import {SchoolSearchInput, SchoolSearchOutput} from "../models/school.model";

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(
    private httpClient: HttpClient
  ) {}

  search(query: SchoolSearchOutput) {
    const uri = 'school/search'
    return this.httpClient.get<SchoolSearchInput>(uri,
      {
        ...httpOptions,
        params: objectToParams(query)
      }
    );
  }

  createTag(data: CreateTaggedOutput) {
    const uri = 'school/create-tag';
    return this.httpClient.post<TaggedInput>(uri, data, httpOptions);
  }
}
