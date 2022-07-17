import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Job} from "../../../../models/job.model";

@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.scss']
})
export class JobItemComponent implements OnInit {
  @Input() job: Job;
  @Input() link: string;
  @Input() labelButton: string;
  @Input() showButton: boolean;
  @Output() clickButton = new EventEmitter<Job>();

  get hasViewCount() {
    return typeof this.job.jobViewLogCount != 'undefined' && this.job.jobViewLogCount != null;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
