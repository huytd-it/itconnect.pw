import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {httpOptions, objectToParams} from "../utils/common";
import {SkillSearchInput, SkillSearchOutput} from "../models/skill.model";
import {CreateOrEditTagOutput, CreateTaggedOutput, TaggedInput} from "../models/common";
import {SchoolSearchInput, SchoolSearchOutput} from "../models/school.model";
import {map} from "rxjs";

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

  createOrEdit(data: CreateOrEditTagOutput) {
    const uri = 'school/createOrEdit';
    return this.httpClient.post<TaggedInput>(uri, data, httpOptions);
  }

  mapData() {
    return map<SchoolSearchInput, SchoolSearchInput>(item => {
      if (!item) {
        return item;
      }
      item.data = item.data.map(it => {
        it.jobSchoolCount = Number(it.jobSchoolCount);
        it.userSchoolCount = Number(it.userSchoolCount);
        it.cvEducationCount = Number(it.cvEducationCount);
        return it;
      })
      return item;
    })
  }
}
