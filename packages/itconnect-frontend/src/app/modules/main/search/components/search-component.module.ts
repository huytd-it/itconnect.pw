import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadFilterComponent } from './head-filter/head-filter.component';
import {CommonComponentsModule} from "../../../../components/common-components.module";
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    HeadFilterComponent,
  ],
  imports: [
    CommonModule,
    CommonComponentsModule,
    NgSelectModule,
    FormsModule
  ],
  exports: [
    HeadFilterComponent
  ]
})
export class SearchComponentModule { }
