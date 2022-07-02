import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {
  WorkExperienceModalComponent
} from "../../modules/main/profile/profile/components/work-experience-modal/work-experience-modal.component";
import {base64ToFile, ImageCroppedEvent} from "ngx-image-cropper";
import {ImageCropperModalComponent} from "../image-cropper-modal/image-cropper-modal.component";
import {FileService} from "../../services/file.service";
import {AppService} from "../../services/app.service";
import {File} from "../../models/file.model";
import {finalize} from "rxjs";

@Component({
  selector: 'app-image-cropper-button',
  templateUrl: './image-cropper-button.component.html',
  styleUrls: ['./image-cropper-button.component.scss']
})
export class ImageCropperButtonComponent implements OnInit {
  @ViewChild('btn') btn: ElementRef;
  @Input() aspectRatio: number = 1/1;
  @Input() resizeToWidth: number = 256;
  @Input() resizeToHeight: number = 256;
  @Input() cropperMinHeight: number = 256
  @Input() cropperMinWidth: number = 256
  @Output() onAdd = new EventEmitter<File>();
  isUploading: boolean;

  constructor(
    public dialog: MatDialog,
    private fileService: FileService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
  }

  fileChangeEvent(event: Event) {
    const dialogRef = this.dialog.open(ImageCropperModalComponent, {
      maxWidth: '95vw',
      maxHeight: '95vh',
      data: {
        aspectRatio: this.aspectRatio,
        resizeToWidth: this.resizeToWidth,
        resizeToHeight: this.resizeToHeight,
        cropperMinHeight: this.cropperMinHeight,
        cropperMinWidth: this.cropperMinWidth,
        image: event
      }
    });

    dialogRef.afterClosed().subscribe((result: ImageCroppedEvent) => {
      this.btn.nativeElement.value = null;
      if (!result.base64) {
        return;
      }
      this.isUploading = true;
      this.appService.setHeadLoading(true);
      const file = base64ToFile(result.base64);
      this.fileService.upload(file)
        .pipe(finalize(() => {
          this.appService.setHeadLoading(false);
          this.isUploading = false
        }))
        .subscribe((data) => {
          this.onAdd.emit(data);
        })
    });
  }
}
