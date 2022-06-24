import { Component, OnInit } from '@angular/core';
import {AppPermission} from "../../../../../../models/permission.model";
import {AuthService} from "../../../../../../services/auth.service";
import {UserInfo} from "../../../../../../models/user.model";
import {MatDialog} from "@angular/material/dialog";
import {CvWorkExperience} from "../../../../../../models/cv-work-experience.model";
import {UserInfoModalComponent} from "../user-info-modal/user-info-modal.component";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  readonly permission = AppPermission;

  userInfo: UserInfo;

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.authService.data$.subscribe(data => {
      if (data) {
        this.userInfo = data.user.userInfo;
      }
    })
  }

  onEdit() {
    const dialogRef = this.dialog.open(UserInfoModalComponent, {
      maxWidth: '95vw',
      maxHeight: '95vh',
      data: this.userInfo
    });

    dialogRef.afterClosed().subscribe((result: CvWorkExperience)=> {
    });
  }
}
