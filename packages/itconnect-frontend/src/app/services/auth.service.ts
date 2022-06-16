import { Injectable } from '@angular/core';
import {AuthLoginInput, AuthLoginOutput, AuthRegisterInput, AuthRegisterOutput} from "../models/auth.models";
import {HttpClient} from "@angular/common/http";
import {httpOptions} from "../utils/common";
import {BehaviorSubject, map, Observable} from "rxjs";
import {User} from "../models/user.model";
import {ProfileService} from "./profile.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User | undefined>;
  readonly user$: Observable<User | undefined>;

  private readonly TOKEN_NAME = 'token';

  get token() {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  constructor(
    private httpClient: HttpClient,
    private profileService: ProfileService
  ) {
    this.userSubject = new BehaviorSubject<User | undefined>(undefined);
    this.user$ = this.userSubject.asObservable();
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
    this.userSubject.next(undefined);
  }

  private setUserLogin(user: AuthLoginInput) {
    localStorage.setItem(this.TOKEN_NAME, user.token);
    this.userSubject.next(user.user);
  }

  private preLoadUser() {
    if (!this.token) {
      return;
    }
    this.profileService.profile().subscribe((data) => {
      this.userSubject.next(data);
    })
  }
}
