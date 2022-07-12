import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigCommonRoutingModule } from './config-common-routing.module';
import { ConfigCommonComponent } from './config-common.component';
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    ConfigCommonComponent
  ],
    imports: [
        CommonModule,
        ConfigCommonRoutingModule,
        MatButtonModule
    ]
})
export class ConfigCommonModule { }
