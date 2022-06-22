import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {WorkExperienceModalComponent} from "../work-experience-modal/work-experience-modal.component";
import {finalize} from "rxjs";
import {AppService} from "../../../../../../services/app.service";
import {CvCertificate} from "../../../../../../models/cv-certificate.model";
import {CvCertificateService} from "../../../../../../services/cv-certificate.service";
import {CertificateModalComponent} from "../certificate-modal/certificate-modal.component";

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {

  data: CvCertificate[] = [];

  constructor(
    public dialog: MatDialog,
    private cvCertificateService: CvCertificateService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    let flag = 1;
    this.cvCertificateService.getOwner()
      .pipe(finalize(() => !--flag && this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.data = data;
      })
  }

  onAdd() {
    const dialogRef = this.dialog.open(CertificateModalComponent, {
      maxWidth: '95vw',
      maxHeight: '95vh',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return
      }
      this.data = [result, ...this.data];
    });
  }

  onEdit(item: CvCertificate) {
    const dialogRef = this.dialog.open(CertificateModalComponent, {
      maxWidth: '95vw',
      maxHeight: '95vh',
      data: item
    });

    dialogRef.afterClosed().subscribe((result: CvCertificate)=> {
      if (!result) {
        return
      }
      const index = this.data.findIndex(item => item.id === result.id);
      this.data[index] = result;
    });
  }

  onRemove(e: CvCertificate) {
    this.appService.setHeadLoading(true);
    this.cvCertificateService.delete(e.id)
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.data = this.data.filter(item => item.id !== e.id);
      })
  }
}
