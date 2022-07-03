import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import {MatIconModule} from "@angular/material/icon";
import {UtilsModule} from "../../../utils/utils.module";
import {MatMenuModule} from "@angular/material/menu";
import {CommonComponentsModule} from "../../../components/common-components.module";


@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatIconModule,
    UtilsModule,
    MatMenuModule,
    CommonComponentsModule
  ]
})
export class AdminModule { }
