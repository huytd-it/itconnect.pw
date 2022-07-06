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
import {ChartUserComponent} from "./chart-user/chart-user.component";
import {CommonComponentsModule} from "../../../../components/common-components.module";
import {MatTabsModule} from "@angular/material/tabs";
import {ChartJobOvComponent} from "./chart-job-ov/chart-job-ov.component";


@NgModule({
  declarations: [
    DashboardComponent,
    ChartJobComponent,
    CardStsComponent,
    ChartUserComponent,
    ChartJobOvComponent
  ],
  exports: [
    ChartJobComponent
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
    AmchartModule,
    CommonComponentsModule,
    MatTabsModule
  ]
})
export class DashboardModule { }
