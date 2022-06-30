import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobSuggestRoutingModule } from './job-suggest-routing.module';
import { JobSuggestComponent } from './job-suggest.component';
import {MainComponentsModule} from "../../components/components.module";
import {MatPaginatorModule} from "@angular/material/paginator";


@NgModule({
  declarations: [
    JobSuggestComponent
  ],
  imports: [
    CommonModule,
    JobSuggestRoutingModule,
    MainComponentsModule,
    MatPaginatorModule
  ]
})
export class JobSuggestModule { }
