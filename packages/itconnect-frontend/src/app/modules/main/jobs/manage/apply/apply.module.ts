import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplyRoutingModule } from './apply-routing.module';
import { ApplyComponent } from './apply.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgSelectModule} from "@ng-select/ng-select";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";
import {UtilsModule} from "../../../../../utils/utils.module";
import {MatButtonModule} from "@angular/material/button";
import {CommonComponentsModule} from "../../../../../components/common-components.module";


@NgModule({
  declarations: [
    ApplyComponent
  ],
  imports: [
    CommonModule,
    ApplyRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    NgSelectModule,
    MatIconModule,
    FormsModule,
    MatPaginatorModule,
    UtilsModule,
    MatButtonModule,
    CommonComponentsModule
  ]
})
export class ApplyModule { }
