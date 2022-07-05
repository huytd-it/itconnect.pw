import { Component, OnInit } from '@angular/core';
import {TAG_ROOT_SERVICE_TOKEN} from "../tag-root/tag-root.component";
import {CertificateService} from "../../../../../services/certificate.service";

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss'],
  providers: [
    {
      provide: TAG_ROOT_SERVICE_TOKEN,
      useExisting: CertificateService
    }
  ]
})
export class CertificateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
