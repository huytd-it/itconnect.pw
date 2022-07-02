import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CvWorkExperienceService} from "./../../../../../services/cv-work-experience.service";
import {finalize} from "rxjs";
import {AppService} from "./../../../../../services/app.service";
import {CvWorkExperience} from "./../../../../../models/cv-work-experience.model";

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss']
})
export class WorkExperienceComponent implements OnInit {
  @Input() data: CvWorkExperience[] = [];

  constructor(
    public dialog: MatDialog,
    private cvWorkExperienceService: CvWorkExperienceService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
  }
}
