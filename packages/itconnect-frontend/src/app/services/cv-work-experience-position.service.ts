import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {httpOptions, objectToParams} from "../utils/common";
import {PositionSearchInput, PositionSearchOutput} from "../models/position.model";
import {CreateTaggedOutput, TaggedInput} from "../models/common";
import {
  CreateOrEditCvWorkExperience,
  CvWorkExperience,
  CvWorkExperiencePosition
} from "../models/cv-work-experience.model";
import {CreateOrEditCvWorkExperiencePosition} from "../models/cv-work-experience-position.model";

@Injectable({
  providedIn: 'root'
})
export class CvWorkExperiencePositionService {

  constructor(
    private httpClient: HttpClient
  ) {}

  refactorData(d: CvWorkExperiencePosition[]) {
    return d.map(item => ({...item, name: item.position.name }));
  }

  createOrEdit(data: CreateOrEditCvWorkExperiencePosition) {
    const uri = 'cv-work-experience-position/createOrEdit';
    return this.httpClient.post<CvWorkExperiencePosition>(uri, data, httpOptions);
  }

  delete(id: number) {
    const uri = 'cv-work-experience-position/' + id;
    return this.httpClient.delete(uri, httpOptions);
  }
}
