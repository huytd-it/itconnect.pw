import { Component, OnInit } from '@angular/core';
import {TAG_ROOT_SERVICE_TOKEN} from "../tag-root/tag-root.component";
import {PositionService} from "../../../../../services/position.service";

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
  providers: [
    {
      provide: TAG_ROOT_SERVICE_TOKEN,
      useExisting: PositionService
    }
  ]
})
export class PositionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
