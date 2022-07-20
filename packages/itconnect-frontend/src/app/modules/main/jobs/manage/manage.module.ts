import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRoutingModule } from './manage-routing.module';
import { ManageComponent } from './manage.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { ChartComponent } from './chart/chart.component';
import {AmchartModule} from "../../../../amchart/amchart.module";
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule} from "@angular/forms";
import {CommonComponentsModule} from "../../../../components/common-components.module";
import {CreateModule} from "../create/create.module";
import { ViewComponent } from './view/view.component';


@NgModule({
    declarations: [
        ManageComponent,
        ChartComponent,
        ViewComponent
    ],
    exports: [
        ChartComponent
    ],
    imports: [
        CommonModule,
        ManageRoutingModule,
        MatTabsModule,
        MatIconModule,
        MatButtonModule,
        AmchartModule,
        NgSelectModule,
        FormsModule,
        CommonComponentsModule,
      CreateModule
    ]
})
export class ManageModule { }
