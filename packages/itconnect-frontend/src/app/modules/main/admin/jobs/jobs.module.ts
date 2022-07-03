import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsComponent } from './jobs.component';
import {MatTabsModule} from "@angular/material/tabs";
import { ApproveComponent } from './approve/approve.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {MainComponentsModule} from "../../components/components.module";
import {MatPaginatorModule} from "@angular/material/paginator";
import {UtilsModule} from "../../../../utils/utils.module";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [
    JobsComponent,
    ApproveComponent
  ],
  imports: [
    CommonModule,
    JobsRoutingModule,
    MatTabsModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    NgSelectModule,
    MainComponentsModule,
    MatPaginatorModule,
    UtilsModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule
  ]
})
export class JobsModule { }
