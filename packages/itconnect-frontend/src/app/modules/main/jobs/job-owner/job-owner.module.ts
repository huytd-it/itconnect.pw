import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobOwnerRoutingModule } from './job-owner-routing.module';
import { JobOwnerComponent } from './job-owner.component';
import {UtilsModule} from "../../../../utils/utils.module";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {NgSelectModule} from "@ng-select/ng-select";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    JobOwnerComponent
  ],
  imports: [
    CommonModule,
    JobOwnerRoutingModule,
    UtilsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    NgSelectModule,
    MatInputModule
  ]
})
export class JobOwnerModule { }
