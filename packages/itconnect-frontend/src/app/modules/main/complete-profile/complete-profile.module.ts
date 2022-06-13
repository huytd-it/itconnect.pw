import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompleteProfileRoutingModule } from './complete-profile-routing.module';
import { CompleteProfileComponent } from './complete-profile.component';
import {CompleteProfileComponentsModule} from "./components/components.module";
import {MatStepperModule} from "@angular/material/stepper";
import {CommonComponentsModule} from "../../../components/common-components.module";


@NgModule({
  declarations: [
    CompleteProfileComponent
  ],
  imports: [
    CommonModule,
    CompleteProfileRoutingModule,
    CompleteProfileComponentsModule,
    MatStepperModule,
    CommonComponentsModule
  ]
})
export class CompleteProfileModule { }
