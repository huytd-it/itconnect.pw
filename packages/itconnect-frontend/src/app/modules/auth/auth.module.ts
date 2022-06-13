import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import {AuthComponentsModule} from "./components/components.module";
import {CommonComponentsModule} from "../../components/common-components.module";
import {LoginComponent} from "./login/login.component";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AuthComponentsModule,
    CommonComponentsModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MatIconModule
  ]
})
export class AuthModule { }
