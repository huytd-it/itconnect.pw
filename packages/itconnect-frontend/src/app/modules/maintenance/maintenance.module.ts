import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { MaintenanceComponent } from './maintenance.component';
import {CommonComponentsModule} from "../../components/common-components.module";


@NgModule({
  declarations: [
    MaintenanceComponent
  ],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    CommonComponentsModule
  ]
})
export class MaintenanceModule { }
