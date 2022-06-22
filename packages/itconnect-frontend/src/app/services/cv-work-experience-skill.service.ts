import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {httpOptions, objectToParams} from "../utils/common";
import {SkillSearchInput, SkillSearchOutput} from "../models/skill.model";
import {CreateTaggedOutput, TaggedInput} from "../models/common";
import {
  CreateOrEditCvWorkExperience,
  CvWorkExperience,
  CvWorkExperienceSkill
} from "../models/cv-work-experience.model";
import {CreateOrEditCvWorkExperienceSkill} from "../models/cv-work-experience-skill.model";

@Injectable({
  providedIn: 'root'
})
export class CvWorkExperienceSkillService {

  constructor(
    private httpClient: HttpClient
  ) {}

  refactorData(d: CvWorkExperienceSkill[]) {
    return d.map(item => ({...item, name: item.skill.name }));
  }

  createOrEdit(data: CreateOrEditCvWorkExperienceSkill) {
    const uri = 'cv-work-experience-skill/createOrEdit';
    return this.httpClient.post<CvWorkExperienceSkill>(uri, data, httpOptions);
  }

  delete(id: number) {
    const uri = 'cv-work-experience-skill/' + id;
    return this.httpClient.delete(uri, httpOptions);
  }
}
