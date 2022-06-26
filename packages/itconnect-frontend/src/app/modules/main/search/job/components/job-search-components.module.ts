import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicFilterComponent } from './basic-filter/basic-filter.component';
import { FullFilterComponent } from './full-filter/full-filter.component';
import {CommonComponentsModule} from "../../../../../components/common-components.module";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {MainComponentsModule} from "../../../components/components.module";
import {NgSelectModule} from "@ng-select/ng-select";



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
        CommonComponentsModule,
        MatIconModule,
        FormsModule,
        MainComponentsModule,
        NgSelectModule
    ],
})
export class JobSearchComponentsModule { }
