import { Injectable } from '@angular/core';
import {AuthLoginInput, AuthLoginOutput, AuthRegisterInput, AuthRegisterOutput} from "../models/auth.models";
import {HttpClient} from "@angular/common/http";
import {httpOptions} from "../utils/common";
import {BehaviorSubject, map, Observable} from "rxjs";
import {User} from "../models/user.model";
import {ProfileService} from "./profile.service";
import {ProfileDataBoostrap} from "../models/profile.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private dataSubject: BehaviorSubject<ProfileDataBoostrap | undefined>;
  readonly data$: Observable<ProfileDataBoostrap | undefined>;

  private readonly TOKEN_NAME = 'token';

  get token() {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  constructor(
    private httpClient: HttpClient,
    private profileService: ProfileService
  ) {
    this.dataSubject = new BehaviorSubject<ProfileDataBoostrap | undefined>(undefined);
    this.data$ = this.dataSubject.asObservable();
    setTimeout(() => {
      this.preLoadUser();
    })
  }

  login(data: AuthLoginOutput) {
    const uri = 'auth/login'
    return this.httpClient.post<AuthLoginInput>(uri, data, httpOptions)
      .pipe(map(data => {
        this.setUserLogin(data);
        return data;
      }))
  }

  register(data: AuthRegisterOutput) {
    const uri = 'auth/register'
    return this.httpClient.post<AuthRegisterInput>(uri, data, httpOptions)
      .pipe(map(data => {
        this.setUserLogin(data);
        return data;
      }))
  }

  logout() {
    localStorage.removeItem(this.TOKEN_NAME);
    this.dataSubject.next(undefined);
  }

  private setUserLogin(user: AuthLoginInput) {
    localStorage.setItem(this.TOKEN_NAME, user.token);
    this.preLoadUser();
  }

  private preLoadUser() {
    if (!this.token) {
      return;
    }
    this.profileService.dataBoostrap().subscribe((data) => {
      this.dataSubject.next(data);
    })
  }
}
