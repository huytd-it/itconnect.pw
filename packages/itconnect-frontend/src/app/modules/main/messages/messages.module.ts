import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';
import {CommonComponentsModule} from "../../../components/common-components.module";
import {MessagesComponentsModule} from "./components/components.module";


@NgModule({
  declarations: [
    MessagesComponent
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    CommonComponentsModule,
    MessagesComponentsModule,
  ]
})
export class MessagesModule { }
