import { Component, OnInit } from '@angular/core';
import {faBuilding} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.component.html',
  styleUrls: ['./profile-company.component.scss']
})
export class ProfileCompanyComponent implements OnInit {
  faBuilding = faBuilding;

  constructor() { }

  ngOnInit(): void {
  }

}
