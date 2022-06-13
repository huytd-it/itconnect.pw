import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import {CommonComponentsModule} from "../../../components/common-components.module";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatProgressBarModule} from "@angular/material/progress-bar";


@NgModule({
  declarations: [
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    CommonComponentsModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatProgressBarModule
  ]
})
export class RegisterModule { }
