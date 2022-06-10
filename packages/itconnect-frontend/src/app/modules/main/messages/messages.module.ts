import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';
import {ComponentsModule} from "../../../components/components.module";
import {MessagesComponentsModule} from "./components/components.module";


@NgModule({
  declarations: [
    MessagesComponent
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    ComponentsModule,
    MessagesComponentsModule,
  ]
})
export class MessagesModule { }
