import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { ViewComponent } from './view.component';
import {UtilsModule} from "../../../../utils/utils.module";
import {CommonComponentsModule} from "../../../../components/common-components.module";


@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    ViewRoutingModule,
    UtilsModule,
    CommonComponentsModule
  ]
})
export class ViewModule { }
