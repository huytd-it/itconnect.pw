import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobApplyCompanyRoutingModule } from './job-apply-company-routing.module';
import { JobApplyCompanyComponent } from './job-apply-company.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {NgSelectModule} from "@ng-select/ng-select";
import {MainComponentsModule} from "../../components/components.module";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    JobApplyCompanyComponent
  ],
  imports: [
    CommonModule,
    JobApplyCompanyRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    NgSelectModule,
    MainComponentsModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatButtonModule
  ]
})
export class JobApplyCompanyModule { }
