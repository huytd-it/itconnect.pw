import { Component, OnInit } from '@angular/core';
import {faInfoCircle, faPersonBooth} from "@fortawesome/free-solid-svg-icons";
import {faConnectdevelop} from "@fortawesome/free-brands-svg-icons";
import {OptionItem} from "../../../../../models/common";

export interface ConfigFieldItem extends OptionItem {
  require?: boolean;
}

@Component({
  selector: 'app-profile-staff',
  templateUrl: './profile-staff.component.html',
  styleUrls: ['./profile-staff.component.scss']
})
export class ProfileStaffComponent implements OnInit {
  faInfoCircle = faInfoCircle;
  faConnectDevelop = faConnectdevelop;


  constructor() { }

  ngOnInit(): void {
  }
}
