import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import {ProfileComponentsModule} from "./components/components.module";


@NgModule({
  declarations: [
    ContactComponent
  ],
    imports: [
        CommonModule,
        ContactRoutingModule,
        ProfileComponentsModule
    ]
})
export class ContactModule { }
