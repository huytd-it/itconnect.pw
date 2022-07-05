import { Component, OnInit } from '@angular/core';
import {TAG_ROOT_SERVICE_TOKEN_2} from "../tag-root-2/tag-root-2.component";
import {WorkFromService} from "../../../../../services/work-from.service";
import {JobTypeService} from "../../../../../services/job-type.service";

@Component({
  selector: 'app-job-type',
  templateUrl: './job-type.component.html',
  styleUrls: ['./job-type.component.scss'],
  providers: [
    {
      provide: TAG_ROOT_SERVICE_TOKEN_2,
      useExisting: JobTypeService
    }
  ]
})
export class JobTypeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
