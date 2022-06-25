import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicFilterComponent } from './basic-filter/basic-filter.component';
import { FullFilterComponent } from './full-filter/full-filter.component';
import {CommonComponentsModule} from "../../../../../components/common-components.module";



@NgModule({
  declarations: [
    BasicFilterComponent,
    FullFilterComponent
  ],
  exports: [
    FullFilterComponent,
    BasicFilterComponent
  ],
  imports: [
    CommonModule,
    CommonComponentsModule
  ]
})
export class JobSearchComponentsModule { }
