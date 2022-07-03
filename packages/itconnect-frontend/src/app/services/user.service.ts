import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {httpOptions, objectToParams} from "../utils/common";
import {User, UserSearchInput, UserSearchOutput} from "../models/user.model";
import {WorkFromSearchInput} from "../models/work-from.model";

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
}
