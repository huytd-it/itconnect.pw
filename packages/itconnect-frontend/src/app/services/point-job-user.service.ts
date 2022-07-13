import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {httpOptions, objectToParams} from "../utils/common";
import {PointJobUserSearchInput, PointJobUserSearchOutput} from "../models/point-job-user.model";
import {PointConfig, PointConfigType} from "../models/point-config.model";

@Injectable({
  providedIn: 'root'
})
export class PointJobUserService {

  constructor(
    private httpClient: HttpClient
  ) {}

  search(query: PointJobUserSearchOutput) {
    const uri = 'point-job-user/search'
    return this.httpClient.get<PointJobUserSearchInput>(uri,
      {
        ...httpOptions,
        params: objectToParams(query)
      }
    );
  }

  getConfigOne(type: PointConfigType) {
    const uri = 'point-job-user/config/' + type;
    return this.httpClient.get<PointConfig>(uri, httpOptions);
  }

  saveConfigOne(data: PointConfig) {
    const uri = 'point-job-user/config';
    return this.httpClient.post<PointConfig>(uri, data, httpOptions);
  }
}
