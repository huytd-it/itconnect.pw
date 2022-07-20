import {Component, OnInit} from '@angular/core';
import {AddressService} from "../../../../services/address.service";
import {AppService} from "../../../../services/app.service";
import {finalize, forkJoin} from "rxjs";
import {PointConfigType} from "../../../../models/point-config.model";
import {PointJobUserService} from "../../../../services/point-job-user.service";

@Component({
  selector: 'app-config-common',
  templateUrl: './config-common.component.html',
  styleUrls: ['./config-common.component.scss']
})
export class ConfigCommonComponent implements OnInit {
  isAddressSync: boolean = false;
  allowTagged: number;
  limitSuggest: number;
  readonly PointConfigType = PointConfigType;

  get keys() {
    return Object.values(PointConfigType) as any;
  }

  constructor(
    private addressService: AddressService,
    public appService: AppService,
    private pointJobUserService: PointJobUserService,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.load();
    })
  }

  load() {
    forkJoin([
      this.pointJobUserService.getConfigOne(PointConfigType.AllowTagged),
      this.pointJobUserService.getConfigOne(PointConfigType.LimitSuggest)
    ]).subscribe(([allowTagged, limitSuggest]) => {
      this.allowTagged = allowTagged.point;
      this.limitSuggest = limitSuggest.point;
    })
  }

  saveAllowTagged() {
    this.appService.setHeadLoading(true);
    this.pointJobUserService.saveConfigOne(<any>{
      type: PointConfigType.AllowTagged,
      point: this.allowTagged ? 0 : 1
    })
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.allowTagged = this.allowTagged ? 0 : 1;
      })
  }

  onAddressSync() {
    this.appService.setHeadLoading(true);
    this.addressService.sync()
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(() => {
        this.isAddressSync = true;
      })
  }

  saveLimitSuggest() {
    this.appService.setHeadLoading(true);
    this.pointJobUserService.saveConfigOne(<any>{
      type: PointConfigType.LimitSuggest,
      point: this.limitSuggest
    })
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(() => {
      })
  }
}
