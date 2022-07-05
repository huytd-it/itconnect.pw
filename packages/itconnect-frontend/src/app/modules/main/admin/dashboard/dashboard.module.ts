import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {NativeDateModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {ChartJobComponent} from "./chart-job/chart-job.component";
import {AmchartModule} from "../../../../amchart/amchart.module";
import { CardStsComponent } from './card-sts/card-sts.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ChartJobComponent,
    CardStsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatDatepickerModule,
    NativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    NgSelectModule,
    AmchartModule
  ]
})
export class DashboardModule { }
