import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "./../../../../../services/auth.service";
import {UserInfo} from "./../../../../../models/user.model";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  @Input() userInfo: UserInfo;

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
  }
}
