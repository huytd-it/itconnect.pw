import { Component, OnInit } from '@angular/core';
import {TAG_ROOT_SERVICE_TOKEN} from "../tag-root/tag-root.component";
import {SkillService} from "../../../../../services/skill.service";
import {TAG_ROOT_SERVICE_TOKEN_2} from "../tag-root-2/tag-root-2.component";
import {WorkFromService} from "../../../../../services/work-from.service";

@Component({
  selector: 'app-work-from',
  templateUrl: './work-from.component.html',
  styleUrls: ['./work-from.component.scss'],
  providers: [
    {
      provide: TAG_ROOT_SERVICE_TOKEN_2,
      useExisting: WorkFromService
    }
  ]
})
export class WorkFromComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
