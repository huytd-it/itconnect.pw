import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import * as _ from "lodash";
import {AppService} from "./../../../../../services/app.service";
import {CvCertificate} from "./../../../../../models/cv-certificate.model";
import {Options} from "@angular-slider/ngx-slider";
import {UserCertificate} from "./../../../../../models/user-certificate.model";
import {UserCertificateService} from "./../../../../../services/user-certifiacte.service";
import {finalize} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-certificate-item',
  templateUrl: './certificate-item.component.html',
  styleUrls: ['./certificate-item.component.scss']
})
export class CertificateItemComponent implements OnInit, OnChanges {
  @Input() data: CvCertificate;
  userCertificate: UserCertificate;

  options: Options = {
    floor: 1,
    ceil: 10,
    step: 1,
    showTicks: true,
    showSelectionBar: true,
    getPointerColor: value => 'var(--primary)',
    getTickColor: value => '#d8e0f3',
    getSelectionBarColor: value => 'var(--primary)',
    readOnly: true
  };

  constructor(
    private appService: AppService,
    private userCertificateService: UserCertificateService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const {data} = changes;
    if (data && data.currentValue && !_.isEqual(data.currentValue, data.previousValue)) {
      setTimeout(() => this.load())
    }
  }

  load() {
    this.appService.setHeadLoading(true);
    this.userCertificateService.getByCertificateUId(this.data.certificate.id, this.route.snapshot.params['id'])
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.userCertificate = data;
      })
  }
}
