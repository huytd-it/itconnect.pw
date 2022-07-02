import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AppService} from "./../../../../../services/app.service";
import {CvCertificate} from "./../../../../../models/cv-certificate.model";
import {CvCertificateService} from "./../../../../../services/cv-certificate.service";

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {
  @Input() data: CvCertificate[] = [];

  constructor(
    public dialog: MatDialog,
    private cvCertificateService: CvCertificateService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
  }
}
