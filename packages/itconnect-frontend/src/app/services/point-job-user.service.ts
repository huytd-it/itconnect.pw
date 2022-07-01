import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {httpOptions, objectToParams} from "../utils/common";
import {PointJobUserSearchInput, PointJobUserSearchOutput} from "../models/point-job-user.model";

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
}
