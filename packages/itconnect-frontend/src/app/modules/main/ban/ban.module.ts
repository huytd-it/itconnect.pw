import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BanRoutingModule } from './ban-routing.module';
import { BanComponent } from './ban.component';


@NgModule({
  declarations: [
    BanComponent
  ],
  imports: [
    CommonModule,
    BanRoutingModule
  ]
})
export class BanModule { }
