import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {httpOptions, objectToParams} from "../utils/common";
import {CreateOrEditCvEducation, CvEducation} from "../models/cv-education.model";

@Injectable({
  providedIn: 'root'
})
export class CvEducationService {

  constructor(
    private httpClient: HttpClient
  ) {}

  createOrEdit(data: CreateOrEditCvEducation) {
    const uri = 'cv-education/createOrEdit';
    return this.httpClient.post<CvEducation>(uri, data, httpOptions);
  }

  getOwner() {
    const uri = 'cv-education/getOwner';
    return this.httpClient.get<CvEducation[]>(uri, httpOptions);
  }

  delete(id: number) {
    const uri = 'cv-education/' + id;
    return this.httpClient.delete(uri, httpOptions);
  }
}
