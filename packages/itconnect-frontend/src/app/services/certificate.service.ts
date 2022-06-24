import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {httpOptions, objectToParams} from "../utils/common";
import {SkillSearchInput, SkillSearchOutput} from "../models/skill.model";
import {CreateTaggedOutput, TaggedInput} from "../models/common";
import {CertificateSearchInput, CertificateSearchOutput} from "../models/certificate.model";

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

  createTag(data: CreateTaggedOutput) {
    const uri = 'certificate/create-tag';
    return this.httpClient.post<TaggedInput>(uri, data, httpOptions);
  }
}
