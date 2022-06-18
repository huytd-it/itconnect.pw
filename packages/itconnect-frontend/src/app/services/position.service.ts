import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {httpOptions, objectToParams} from "../utils/common";
import {PositionSearchInput, PositionSearchOutput} from "../models/position.model";

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(
    private httpClient: HttpClient
  ) {}

  search(query: PositionSearchOutput) {
    const uri = 'position/search'
    return this.httpClient.get<PositionSearchInput>(uri,
      {
        ...httpOptions,
        params: objectToParams(query)
      }
    );
  }
}
