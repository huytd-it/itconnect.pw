import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {httpOptions, objectToParams} from "../utils/common";
import {SkillSearchInput, SkillSearchOutput} from "../models/skill.model";

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
}
