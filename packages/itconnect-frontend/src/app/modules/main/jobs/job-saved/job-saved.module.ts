import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobSavedRoutingModule } from './job-saved-routing.module';
import { JobSavedComponent } from './job-saved.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgSelectModule} from "@ng-select/ng-select";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";
import {UtilsModule} from "../../../../utils/utils.module";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    JobSavedComponent
  ],
    imports: [
        CommonModule,
        JobSavedRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        NgSelectModule,
        MatIconModule,
        FormsModule,
        MatPaginatorModule,
        UtilsModule,
        MatButtonModule
    ]
})
export class JobSavedModule { }
