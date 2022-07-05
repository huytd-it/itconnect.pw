import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {httpOptions, objectToParams} from "../utils/common";
import {SkillSearchInput, SkillSearchOutput} from "../models/skill.model";
import {CreateOrEditTagOutput, CreateTaggedOutput, TaggedInput} from "../models/common";
import {map} from "rxjs";

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

  createOrEdit(data: CreateOrEditTagOutput) {
    const uri = 'skill/createOrEdit';
    return this.httpClient.post<TaggedInput>(uri, data, httpOptions);
  }

  mapData() {
    return map<SkillSearchInput, SkillSearchInput>(item => {
      if (!item) {
        return item;
      }
      item.data = item.data.map(it => {
        it.jobSkillCount = Number(it.jobSkillCount);
        it.userSkillCount = Number(it.userSkillCount);
        return it;
      })
      return item;
    })
  }
}
