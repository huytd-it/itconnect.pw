import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CommonComponentsModule } from "../../components/common-components.module";
import {MatTabsModule} from "@angular/material/tabs";
import {HomeComponentsModule} from "./components/components.module";


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    CommonComponentsModule,
    HomeRoutingModule,
    MatTabsModule,
    HomeComponentsModule
  ]
})
export class HomeModule { }
