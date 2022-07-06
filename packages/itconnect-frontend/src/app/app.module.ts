import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BaseIntercept} from "./utils/intercepts/base.intercept";
import {ErrorIntercept} from "./utils/intercepts/error.intercept";
import {AuthGuard} from "./utils/guards/auth.guard";
import {GuestGuard} from "./utils/guards/guest.guard";
import {JwtIntercept} from "./utils/intercepts/jwt.intercept";
import {ServicesModule} from "./services/services.module";
import {CommonComponentsModule} from "./components/common-components.module";
import {PermissionGuard} from "./utils/guards/permission.guard";
import {MAT_DATE_LOCALE} from "@angular/material/core";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ServicesModule,
    CommonComponentsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BaseIntercept, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtIntercept, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorIntercept, multi: true},
    AuthGuard,
    GuestGuard,
    PermissionGuard,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
