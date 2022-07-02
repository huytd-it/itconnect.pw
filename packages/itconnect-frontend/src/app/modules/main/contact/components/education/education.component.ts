import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {finalize} from "rxjs";
import {AppService} from "./../../../../../services/app.service";
import {CvEducation} from "./../../../../../models/cv-education.model";
import {CvEducationService} from "./../../../../../services/cv-education.service";

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  @Input() data: CvEducation[] = [];

  constructor(
    private appService: AppService
  ) { }

  ngOnInit(): void {
  }
}
