import { Component, OnInit } from '@angular/core';
import {AddressService} from "../../../../services/address.service";
import {AppService} from "../../../../services/app.service";
import {finalize} from "rxjs";

@Component({
  selector: 'app-config-common',
  templateUrl: './config-common.component.html',
  styleUrls: ['./config-common.component.scss']
})
export class ConfigCommonComponent implements OnInit {
  isAddressSync: boolean = false;

  constructor(
    private addressService: AddressService,
    public appService: AppService
  ) { }

  ngOnInit(): void {
  }

  onAddressSync() {
    this.appService.setHeadLoading(true);
    this.addressService.sync()
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(() => {
        this.isAddressSync = true;
      })
  }
}
