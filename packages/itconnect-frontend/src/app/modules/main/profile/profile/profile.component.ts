import { Component, OnInit } from '@angular/core';
import {AppPermission} from "../../../../models/permission.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  readonly permission = AppPermission;

  constructor() { }

  ngOnInit(): void {
  }

}
