import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {httpOptions, objectToParams} from "../utils/common";
import {SkillSearchInput, SkillSearchOutput} from "../models/skill.model";
import {CreateTaggedOutput, TaggedInput} from "../models/common";

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(
    private httpClient: HttpClient
  ) {}

  search(query: SkillSearchOutput) {
    const uri = 'skill/search'
    return this.httpClient.get<SkillSearchInput>(uri,
      {
        ...httpOptions,
        params: objectToParams(query)
      }
    );
  }

  createTag(data: CreateTaggedOutput) {
    const uri = 'skill/create-tag';
    return this.httpClient.post<TaggedInput>(uri, data, httpOptions);
  }
}
