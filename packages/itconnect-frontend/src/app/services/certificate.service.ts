import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {httpOptions, objectToParams} from "../utils/common";
import {SkillSearchInput, SkillSearchOutput} from "../models/skill.model";
import {CreateOrEditTagOutput, CreateTaggedOutput, TaggedInput} from "../models/common";
import {CertificateSearchInput, CertificateSearchOutput} from "../models/certificate.model";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(
    private httpClient: HttpClient
  ) {}

  search(query: CertificateSearchOutput) {
    const uri = 'certificate/search'
    return this.httpClient.get<CertificateSearchInput>(uri,
      {
        ...httpOptions,
        params: objectToParams(query)
      }
    );
  }

  createOrEdit(data: CreateOrEditTagOutput) {
    const uri = 'certificate/createOrEdit';
    return this.httpClient.post<TaggedInput>(uri, data, httpOptions);
  }

  createTag(data: CreateTaggedOutput) {
    const uri = 'certificate/create-tag';
    return this.httpClient.post<TaggedInput>(uri, data, httpOptions);
  }

  mapData() {
    return map<CertificateSearchInput, CertificateSearchInput>(item => {
      if (!item) {
        return item;
      }
      item.data = item.data.map(it => {
        it.jobCertificateCount = Number(it.jobCertificateCount);
        it.userCertificateCount = Number(it.userCertificateCount);
        return it;
      })
      return item;
    })
  }
}
