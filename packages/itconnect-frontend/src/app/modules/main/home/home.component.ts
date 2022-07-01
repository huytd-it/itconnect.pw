import { Component, OnInit } from '@angular/core';
import { AppPermission, AppRole } from 'src/app/models/permission.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  readonly AppPermission = AppPermission;
  readonly AppRole = AppRole;

  constructor() { }

  ngOnInit(): void {
  }

}
