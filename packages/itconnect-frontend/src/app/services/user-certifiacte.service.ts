import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {httpOptions, objectToParams} from "../utils/common";
import {SkillSearchOutput} from "../models/skill.model";
import {CreateOrEditUserSkillOutput, UserSkill} from "../models/user-skill.model";
import {CreateOrEditUserCertificateOutput, UserCertificate} from "../models/user-certificate.model";

@Injectable({
  providedIn: 'root'
})
export class UserCertificateService {

  constructor(
    private httpClient: HttpClient
  ) {}

  formatDataToTagged(data: UserCertificate[]) {
    return data.map(item => {
      return {...item, name: item.certificate.name }
    })
  }

  getAll() {
    const uri = 'user-certificate/getAll'
    return this.httpClient.get<UserCertificate[]>(uri, httpOptions);
  }

  createOrEdit(data: CreateOrEditUserCertificateOutput) {
    const uri = 'user-certificate/createOrEdit'
    return this.httpClient.post<UserCertificate>(uri, data, httpOptions);
  }

  delete(id: number) {
    const uri = 'user-certificate/' + id;
    return this.httpClient.delete(uri, httpOptions);
  }

  getByCertificateId(id: number) {
    const uri = 'user-certificate/getByCertificateId/' + id;
    return this.httpClient.get<UserCertificate>(uri, httpOptions);
  }

  getByCertificateUId(id: number, userId: number) {
    const uri = `user-certificate/getByCertificateUId/${id}/${userId}`;
    return this.httpClient.get<UserCertificate>(uri, httpOptions);
  }

}
