import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CvWorkExperience} from "../../models/cv-work-experience.model";
import {ImageCroppedEvent} from "ngx-image-cropper";

@Component({
  selector: 'app-image-cropper-modal',
  templateUrl: './image-cropper-modal.component.html',
  styleUrls: ['./image-cropper-modal.component.scss']
})
export class ImageCropperModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ImageCropperModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  close(data?: ImageCroppedEvent) {
    this.dialogRef.close(data);
  }

}
