import { Component, OnInit } from '@angular/core';
import {faTrash, faBan} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {
  faTrash = faTrash;
  faBan = faBan;

  constructor() { }

  ngOnInit(): void {
  }

}
