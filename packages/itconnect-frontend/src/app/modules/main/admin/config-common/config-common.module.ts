import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigCommonRoutingModule } from './config-common-routing.module';
import { ConfigCommonComponent } from './config-common.component';
import {MatButtonModule} from "@angular/material/button";
import { PointCfItemComponent } from './point-cf-item/point-cf-item.component';
import {CommonComponentsModule} from "../../../../components/common-components.module";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ConfigCommonComponent,
    PointCfItemComponent
  ],
    imports: [
        CommonModule,
        ConfigCommonRoutingModule,
        MatButtonModule,
        CommonComponentsModule,
        MatIconModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class ConfigCommonModule { }
