import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {httpOptions, objectToParams} from "../utils/common";
import {User, UserBanStsInput, UserSearchInput, UserSearchOutput, UserStsInput} from "../models/user.model";
import {WorkFromSearchInput} from "../models/work-from.model";
import {StatisticOutput} from "../models/common";
import {JobSavedStsInput} from "../models/job-saved.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) {}

  get(id: number) {
    const uri = 'user/' + id;
    return this.httpClient.get<User>(uri, httpOptions);
  }

  search(query: UserSearchOutput) {
    const uri = 'user/search';
    return this.httpClient.get<UserSearchInput>(uri,
      {
        ...httpOptions,
        params: objectToParams(query)
      }
    );
  }

  delete(id: number) {
    const uri  = 'user/' + id;
    return this.httpClient.delete(uri, httpOptions);
  }

  ban(id: number) {
    const uri  = 'user/ban/' + id;
    return this.httpClient.put(uri, httpOptions);
  }

  unban(id: number) {
    const uri  = 'user/unban/' + id;
    return this.httpClient.put(uri, httpOptions);
  }

  sts(data: StatisticOutput) {
    const uri = 'user/sts';
    return this.httpClient.post<UserStsInput[]>(uri, data, httpOptions);
  }

  stsBan(data: StatisticOutput) {
    const uri = 'user/sts-ban';
    return this.httpClient.post<UserBanStsInput[]>(uri, data, httpOptions);
  }

  formatSts(data: UserStsInput[]) {
    return data.map(item => ({
      ...item,
      countUser: Number(item.countUser) || 0,
      countCompany: Number(item.countCompany) || 0,
      countAllUser: Number(item.countAllUser) || 0,
    }))
  }

  formatStsBan(data: UserBanStsInput[]) {
    return data.map(item => ({
      ...item,
      countBanCompany: Number(item.countBanCompany) || 0,
      countBanUser: Number(item.countBanUser) || 0,
    }))
  }
}
