import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {CommonComponentsModule} from "../../../components/common-components.module";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    CommonComponentsModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
