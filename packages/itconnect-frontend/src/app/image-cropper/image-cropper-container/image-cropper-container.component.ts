import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ImageCroppedEvent, ImageTransform, LoadedImage} from "ngx-image-cropper";

@Component({
  selector: 'app-image-cropper-container',
  templateUrl: './image-cropper-container.component.html',
  styleUrls: ['./image-cropper-container.component.scss']
})
export class ImageCropperContainerComponent implements OnInit {
  @Input() aspectRatio: number = 1/1;
  @Input() resizeToWidth: number = 256;
  @Input() resizeToHeight: number = 256;
  @Input() cropperMinHeight: number = 256
  @Input() cropperMinWidth: number = 256
  @Input() imageChangedEvent: any;
  @Output() onAdd = new EventEmitter<ImageCroppedEvent>();
  @Output() onClose = new EventEmitter();
  imageDest: ImageCroppedEvent;
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  transform: ImageTransform = {};

  constructor() { }

  ngOnInit(): void {
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.imageDest = event;
  }

  imageLoaded(image: LoadedImage) {
  }

  cropperReady() {
  }

  loadImageFailed() {
  }

  rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH
    };
  }


  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH
    };
  }

  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV
    };
  }

  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
  }

  zoomOut() {
    this.scale -= .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  zoomIn() {
    this.scale += .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  updateRotation() {
    this.transform = {
      ...this.transform,
      rotate: this.rotation
    };
  }
}
