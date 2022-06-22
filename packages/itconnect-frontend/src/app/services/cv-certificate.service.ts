import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {httpOptions, objectToParams} from "../utils/common";
import {SkillSearchInput, SkillSearchOutput} from "../models/skill.model";
import {CreateTaggedOutput, TaggedInput} from "../models/common";
import {CreateOrEditCvWorkExperience, CvWorkExperience} from "../models/cv-work-experience.model";

@Injectable({
  providedIn: 'root'
})
export class CvWorkExperienceService {

  constructor(
    private httpClient: HttpClient
  ) {}

  createOrEdit(data: CreateOrEditCvWorkExperience) {
    const uri = 'cv-work-experience/createOrEdit';
    return this.httpClient.post<CvWorkExperience>(uri, data, httpOptions);
  }

  getOwner() {
    const uri = 'cv-work-experience/getOwner';
    return this.httpClient.get<CvWorkExperience[]>(uri, httpOptions);
  }

  delete(id: number) {
    const uri = 'cv-work-experience/' + id;
    return this.httpClient.delete(uri, httpOptions);
  }
}
