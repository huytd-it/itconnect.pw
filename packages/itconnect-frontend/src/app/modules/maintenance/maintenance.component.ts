import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {finalize} from "rxjs";
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {
  constructor(
    private profileService: ProfileService,
    private appService: AppService,
  ) { }

  ngOnInit(): void {
    this.appService.checkStatusServer();
  }

  onReCheck() {
    this.appService.setFsLoading(true);
    this.appService.checkStatusServer(() => {
      setTimeout(() => {
        this.appService.setFsLoading(false);
      }, 1000);
    });
  }
}
