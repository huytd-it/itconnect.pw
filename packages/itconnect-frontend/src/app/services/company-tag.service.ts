import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {httpOptions, objectToParams} from "../utils/common";
import {SkillSearchInput, SkillSearchOutput} from "../models/skill.model";
import {CreateTaggedOutput, TaggedInput} from "../models/common";
import {CompanyTag, CompanyTagSearchInput, CompanyTagSearchOutput} from "../models/company-tag.model";

@Injectable({
  providedIn: 'root'
})
export class CompanyTagService {

  constructor(
    private httpClient: HttpClient
  ) {}

  search(query: CompanyTagSearchOutput) {
    const uri = 'company-tag/search'
    return this.httpClient.get<CompanyTagSearchInput>(uri,
      {
        ...httpOptions,
        params: objectToParams(query)
      }
    );
  }

  createTag(data: CreateTaggedOutput) {
    const uri = 'company-tag/create-tag';
    return this.httpClient.post<TaggedInput>(uri, data, httpOptions);
  }
}
