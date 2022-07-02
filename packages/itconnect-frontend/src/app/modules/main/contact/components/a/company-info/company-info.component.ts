import { Component, OnInit } from '@angular/core';
import {AppPermission} from "../../../../../../models/permission.model";
import {AuthService} from "../../../../../../services/auth.service";
import {UserInfo} from "../../../../../../models/user.model";
import {MatDialog} from "@angular/material/dialog";
import {CvWorkExperience} from "../../../../../../models/cv-work-experience.model";
import {UserInfoModalComponent} from "../user-info-modal/user-info-modal.component";
import {CompanyInfo} from "../../../../../../models/company-info.model";
import {CompanyInfoModalComponent} from "../company-info-modal/company-info-modal.component";

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss']
})
export class CompanyInfoComponent implements OnInit {
  readonly permission = AppPermission;

  companyInfo: CompanyInfo;

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.authService.data$.subscribe(data => {
      if (data) {
        this.companyInfo = data.user.companyInfo;
      }
    })
  }

  onEdit() {
    const dialogRef = this.dialog.open(CompanyInfoModalComponent, {
      maxWidth: '95vw',
      maxHeight: '95vh',
      data: this.companyInfo
    });

    dialogRef.afterClosed().subscribe((result: CvWorkExperience)=> {
    });
  }
}
