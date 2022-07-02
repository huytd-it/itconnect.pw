import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {httpOptions} from "../utils/common";
import {User} from "../models/user.model";

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
}
