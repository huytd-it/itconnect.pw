import { Component, OnInit } from '@angular/core';
import {TAG_ROOT_SERVICE_TOKEN_2} from "../tag-root-2/tag-root-2.component";
import {JobTypeService} from "../../../../../services/job-type.service";
import {JobLevelService} from "../../../../../services/job-level.service";

@Component({
  selector: 'app-job-level',
  templateUrl: './job-level.component.html',
  styleUrls: ['./job-level.component.scss'],
  providers: [
    {
      provide: TAG_ROOT_SERVICE_TOKEN_2,
      useExisting: JobLevelService
    }
  ]
})
export class JobLevelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
