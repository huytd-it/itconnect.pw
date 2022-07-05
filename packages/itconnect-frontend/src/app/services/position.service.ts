import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {httpOptions, objectToParams} from "../utils/common";
import {PositionSearchInput, PositionSearchOutput} from "../models/position.model";
import {CreateTaggedOutput, TaggedInput} from "../models/common";
import {map} from "rxjs";
import {SkillSearchInput} from "../models/skill.model";

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(
    private httpClient: HttpClient
  ) {}

  search(query: PositionSearchOutput) {
    const uri = 'position/search'
    return this.httpClient.get<PositionSearchInput>(uri,
      {
        ...httpOptions,
        params: objectToParams(query)
      }
    );
  }

  createTag(data: CreateTaggedOutput) {
    const uri = 'position/create-tag';
    return this.httpClient.post<TaggedInput>(uri, data, httpOptions);
  }

  mapData() {
    return map<PositionSearchInput, PositionSearchInput>(item => {
      if (!item) {
        return item;
      }
      item.data = item.data.map(it => {
        it.jobPositionCount = Number(it.jobPositionCount);
        it.userPositionCount = Number(it.userPositionCount);
        return it;
      })
      return item;
    })
  }
}
