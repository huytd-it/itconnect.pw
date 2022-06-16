import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import {AuthComponentsModule} from "./components/components.module";
@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AuthComponentsModule,
  ]
})
export class AuthModule { }
