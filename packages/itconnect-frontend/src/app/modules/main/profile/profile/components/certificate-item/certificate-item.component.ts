import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import * as _ from "lodash";
import {AppService} from "../../../../../../services/app.service";
import {CvCertificate} from "../../../../../../models/cv-certificate.model";
import {Options} from "@angular-slider/ngx-slider";
import {UserCertificate} from "../../../../../../models/user-certificate.model";
import {UserCertificateService} from "../../../../../../services/user-certifiacte.service";
import {finalize} from "rxjs";

@Component({
  selector: 'app-certificate-item',
  templateUrl: './certificate-item.component.html',
  styleUrls: ['./certificate-item.component.scss']
})
export class CertificateItemComponent implements OnInit, OnChanges {
  @Input() data: CvCertificate;
  @Output() onEdit = new EventEmitter<CvCertificate>();
  @Output() onRemove = new EventEmitter<CvCertificate>();

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
  };

  constructor(
    private appService: AppService,
    private userCertificateService: UserCertificateService
  ) { }

  ngOnInit(): void {
    this.appService.setHeadLoading(true);
    this.userCertificateService.getByCertificateId(this.data.certificate.id)
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        console.log(data);
        this.userCertificate = data;
      })
  }

  ngOnChanges(changes: SimpleChanges): void {
    const {data} = changes;
    if (data && data.currentValue && !_.isEqual(data.currentValue, data.previousValue)) {
    }
  }

  onChangeLevel = _.debounce((e: number) => {
    this.userCertificate.level = e;
    this.userCertificateService.createOrEdit({
      id: this.userCertificate.id,
      level: e
    })
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.userCertificate = data;
      })
  }, 400) as any;
}
