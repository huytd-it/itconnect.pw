import { Injectable } from '@angular/core';
import {AuthLoginInput, AuthLoginOutput, AuthRegisterInput, AuthRegisterOutput} from "../models/auth.models";
import {HttpClient} from "@angular/common/http";
import {httpOptions} from "../utils/common";
import {BehaviorSubject, catchError, finalize, map, Observable, throwError} from "rxjs";
import {User, UserInfo} from "../models/user.model";
import {ProfileService} from "./profile.service";
import {CompleteUserProfileInput, ProfileDataBoostrap} from "../models/profile.model";
import {AppPermission, AppPermissionHashMap, AppRole} from "../models/permission.model";
import {PermissionService} from "./permission.service";
import {Router} from "@angular/router";
import {AppService} from "./app.service";
import {environment} from "../../environments/environment";

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

  get data() {
    return this.dataSubject.value;
  }

  constructor(
    private httpClient: HttpClient,
    private profileService: ProfileService,
    private permissionService: PermissionService,
    private router: Router,
    private appService: AppService
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

  isRole(role: AppRole) {
    return this.data?.user.role === role;
  }

  private setUserLogin(user: AuthLoginInput) {
    localStorage.setItem(this.TOKEN_NAME, user.token);
    this.preLoadUser();
  }

  preLoadUser() {
    if (!this.token) {
      return;
    }
    const minTimeLoad = new Promise(res => setTimeout(res, environment.production ? 500 : 0));
    this.appService.setFsLoading(true);
    this.profileService.dataBoostrap()
      .pipe(finalize(() => {
        Promise.all([minTimeLoad]).then(() => {
          this.appService.setFsLoading(false);
        })
      }))
      .pipe(catchError((e) => {
        this.router.navigate(['/maintenance']).then(() => {});
        return throwError(e);
      }))
      .subscribe((data) => {
        this.permissionService.createPermissionHashMap(data.permissions);
        this.dataSubject.next(data);
      })
  }

}
