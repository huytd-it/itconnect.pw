import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRoutingModule } from './create-routing.module';
import { CreateComponent } from './create.component';
import {MainComponentsModule} from "../../components/components.module";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonComponentsModule} from "../../../../components/common-components.module";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {NgSelectModule} from "@ng-select/ng-select";


@NgModule({
  declarations: [
    CreateComponent
  ],
    imports: [
        CommonModule,
        CreateRoutingModule,
        MainComponentsModule,
        ReactiveFormsModule,
        CommonComponentsModule,
        MatDatepickerModule,
        NgSelectModule
    ]
})
export class CreateModule { }
