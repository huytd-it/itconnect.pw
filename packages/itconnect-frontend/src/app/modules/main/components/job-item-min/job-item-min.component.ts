import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Job} from "../../../../models/job.model";

@Component({
  selector: 'app-job-item-min',
  templateUrl: './job-item-min.component.html',
  styleUrls: ['./job-item-min.component.scss']
})
export class JobItemMinComponent implements OnInit {
  @Input() job: Job;
  @Input() link: string;

  constructor() { }

  ngOnInit(): void {
  }

}
