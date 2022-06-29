import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { ViewComponent } from './view.component';
import {UtilsModule} from "../../../../utils/utils.module";
import {CommonComponentsModule} from "../../../../components/common-components.module";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    ViewComponent
  ],
    imports: [
        CommonModule,
        ViewRoutingModule,
        UtilsModule,
        CommonComponentsModule,
        MatIconModule
    ]
})
export class ViewModule { }
