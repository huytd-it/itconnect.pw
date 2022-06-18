import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import {httpOptions} from "../utils/common";
import {
  CompleteCompanyProfileInput,
  CompleteCompanyProfileOutput,
  CompleteUserProfileInput,
  CompleteUserProfileOutput,
  ProfileDataBoostrap
} from "../models/profile.model";

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

  dataBoostrap() {
    const uri = 'profile/data-boostrap'
    return this.httpClient.get<ProfileDataBoostrap>(uri, httpOptions);
  }

  completeUser(data: CompleteUserProfileOutput) {
    const uri = 'profile/complete-user'
    return this.httpClient.post<CompleteUserProfileInput>(uri, data, httpOptions);
  }

  completeCompany(data: CompleteCompanyProfileOutput) {
    const uri = 'profile/complete-company'
    return this.httpClient.post<CompleteCompanyProfileInput>(uri, data, httpOptions);
  }
}
