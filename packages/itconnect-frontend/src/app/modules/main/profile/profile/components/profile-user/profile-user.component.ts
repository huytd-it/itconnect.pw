import { Component, OnInit } from '@angular/core';
import {SearchPageOutput} from "../../../../../../models/common";
import {PositionService} from "../../../../../../services/position.service";

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {

  constructor(
    private positionService: PositionService
  ) { }

  ngOnInit(): void {
  }

  fetchDataPosition = (query: SearchPageOutput) => {
    return this.positionService.search(query);
  }

}
