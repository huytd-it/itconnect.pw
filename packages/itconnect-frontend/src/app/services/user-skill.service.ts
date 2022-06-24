import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {httpOptions, objectToParams} from "../utils/common";
import {SkillSearchOutput} from "../models/skill.model";
import {CreateOrEditUserSkillOutput, UserSkill} from "../models/user-skill.model";

@Injectable({
  providedIn: 'root'
})
export class UserSkillService {

  constructor(
    private httpClient: HttpClient
  ) {}

  formatDataToTagged(data: UserSkill[]) {
    return data.map(item => {
      return {...item, name: item.skill.name }
    })
  }

  getAll() {
    const uri = 'user-skill/getAll'
    return this.httpClient.get<UserSkill[]>(uri, httpOptions);
  }

  createOrEdit(data: CreateOrEditUserSkillOutput) {
    const uri = 'user-skill/createOrEdit'
    return this.httpClient.post<UserSkill>(uri, data, httpOptions);
  }

  delete(id: number) {
    const uri = 'user-skill/' + id;
    return this.httpClient.delete(uri, httpOptions);
  }

}
