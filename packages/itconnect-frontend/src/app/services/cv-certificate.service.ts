import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {httpOptions, objectToParams} from "../utils/common";
import {SkillSearchInput, SkillSearchOutput} from "../models/skill.model";
import {CreateTaggedOutput, TaggedInput} from "../models/common";
import {CreateOrEditCvWorkExperience, CvWorkExperience} from "../models/cv-work-experience.model";
import {CreateOrEditCvCertificate, CvCertificate} from "../models/cv-certificate.model";

@Injectable({
  providedIn: 'root'
})
export class CvCertificateService {

  constructor(
    private httpClient: HttpClient
  ) {}

  createOrEdit(data: CreateOrEditCvCertificate) {
    const uri = 'cv-certificate/createOrEdit';
    return this.httpClient.post<CvCertificate>(uri, data, httpOptions);
  }

  getOwner() {
    const uri = 'cv-certificate/getOwner';
    return this.httpClient.get<CvCertificate[]>(uri, httpOptions);
  }

  delete(id: number) {
    const uri = 'cv-certificate/' + id;
    return this.httpClient.delete(uri, httpOptions);
  }
}
