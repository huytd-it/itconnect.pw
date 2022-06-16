import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import {MainComponentsModule} from "./components/components.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {JwtIntercept} from "../../utils/intercepts/jwt.intercept";
import {ErrorIntercept} from "../../utils/intercepts/error.intercept";


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MainComponentsModule,
  ],
  providers: [
  ]
})
export class MainModule { }
