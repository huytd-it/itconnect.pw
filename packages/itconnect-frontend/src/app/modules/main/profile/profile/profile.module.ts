import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {MainComponentsModule} from "../../components/components.module";
import {ProfileComponentsModule} from "./components/components.module";
import {CommonComponentsModule} from "../../../../components/common-components.module";
import {ImageCropperModule} from "../../../../image-cropper/image-cropper.module";


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MainComponentsModule,
    ProfileComponentsModule,
    CommonComponentsModule,
  ]
})
export class ProfileModule { }
