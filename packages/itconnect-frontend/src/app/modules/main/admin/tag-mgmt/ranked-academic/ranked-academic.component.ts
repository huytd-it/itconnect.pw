import { Component, OnInit } from '@angular/core';
import {TAG_ROOT_SERVICE_TOKEN_2} from "../tag-root-2/tag-root-2.component";
import {JobTypeService} from "../../../../../services/job-type.service";
import {JobLevelService} from "../../../../../services/job-level.service";
import {RankedAcademicService} from "../../../../../services/ranked-academic.service";

@Component({
  selector: 'app-ranked-academic',
  templateUrl: './ranked-academic.component.html',
  styleUrls: ['./ranked-academic.component.scss'],
  providers: [
    {
      provide: TAG_ROOT_SERVICE_TOKEN_2,
      useExisting: RankedAcademicService
    }
  ]
})
export class RankedAcademicComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
