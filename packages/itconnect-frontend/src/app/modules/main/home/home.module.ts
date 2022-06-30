import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {MainComponentsModule} from "../components/components.module";
import {HomeComponentsModule} from "./home-components/home-components.module";


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MainComponentsModule,
    HomeComponentsModule
  ]
})
export class HomeModule { }
