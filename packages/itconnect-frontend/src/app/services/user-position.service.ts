import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {httpOptions, objectToParams} from "../utils/common";
import {PositionSearchOutput} from "../models/position.model";
import {CreateOrEditUserPositionOutput, UserPosition} from "../models/user-position.model";

@Injectable({
  providedIn: 'root'
})
export class UserPositionService {

  constructor(
    private httpClient: HttpClient
  ) {}

  formatDataToTagged(data: UserPosition[]) {
    return data.map(item => {
      return {...item, name: item.position.name }
    })
  }

  getAll() {
    const uri = 'user-position/getAll'
    return this.httpClient.get<UserPosition[]>(uri, httpOptions);
  }

  createOrEdit(data: CreateOrEditUserPositionOutput) {
    const uri = 'user-position/createOrEdit'
    return this.httpClient.post<UserPosition>(uri, data, httpOptions);
  }

  delete(id: number) {
    const uri = 'user-position/' + id;
    return this.httpClient.delete(uri, httpOptions);
  }

}
