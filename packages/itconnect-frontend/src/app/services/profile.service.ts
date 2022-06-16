import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import {httpOptions} from "../utils/common";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  profile() {
    const uri = 'profile'
    return this.httpClient.get<User>(uri, httpOptions);
  }
}
