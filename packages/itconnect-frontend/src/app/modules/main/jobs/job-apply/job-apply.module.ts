import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobApplyRoutingModule } from './job-apply-routing.module';
import { JobApplyComponent } from './job-apply.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgSelectModule} from "@ng-select/ng-select";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";
import {UtilsModule} from "../../../../utils/utils.module";
import {MatButtonModule} from "@angular/material/button";
import {MainComponentsModule} from "../../components/components.module";


@NgModule({
  declarations: [
    JobApplyComponent
  ],
    imports: [
        CommonModule,
        JobApplyRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        NgSelectModule,
        MatIconModule,
        FormsModule,
        MatPaginatorModule,
        UtilsModule,
        MatButtonModule,
        MainComponentsModule
    ]
})
export class JobApplyModule { }
