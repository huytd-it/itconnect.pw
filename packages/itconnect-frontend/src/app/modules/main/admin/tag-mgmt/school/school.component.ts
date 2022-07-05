import { Component, OnInit } from '@angular/core';
import {TAG_ROOT_SERVICE_TOKEN} from "../tag-root/tag-root.component";
import {SkillService} from "../../../../../services/skill.service";
import {SchoolService} from "../../../../../services/school.service";

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss'],
  providers: [
    {
      provide: TAG_ROOT_SERVICE_TOKEN,
      useExisting: SchoolService
    }
  ]
})
export class SchoolComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
