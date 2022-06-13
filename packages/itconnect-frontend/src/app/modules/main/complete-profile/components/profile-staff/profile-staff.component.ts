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

  configsField: ConfigFieldItem[] = [
    {
      id: 999,
      name: 'Vị trí',
      require: true
    },
    {
      id: 1,
      name: 'Framework/Language Program'
    },
    {
      id: 2,
      name: 'OS'
    },
    {
      id: 3,
      name: 'Công cụ'
    },
    {
      id: 4,
      name: 'Network'
    },
    {
      id: 5,
      name: 'Ngôn ngữ'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }
}
