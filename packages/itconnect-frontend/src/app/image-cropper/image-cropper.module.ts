import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCropperContainerComponent } from './image-cropper-container/image-cropper-container.component';
import { ImageCropperButtonComponent } from './image-cropper-button/image-cropper-button.component';
import {ImageCropperModule as ImageCropperModuleLib} from "ngx-image-cropper";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { ImageCropperModalComponent } from './image-cropper-modal/image-cropper-modal.component';



@NgModule({
  declarations: [
    ImageCropperContainerComponent,
    ImageCropperButtonComponent,
    ImageCropperModalComponent
  ],
  imports: [
    CommonModule,
    ImageCropperModuleLib,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    ImageCropperContainerComponent,
    ImageCropperButtonComponent
  ]
})
export class ImageCropperModule { }
