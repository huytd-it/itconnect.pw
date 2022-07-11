import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
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
export class WorkExperienceComponent implements OnInit, OnChanges {
  @Input() data: CvWorkExperience[] = [];
  dataRefactor: {
    isGroup: boolean,
    items: CvWorkExperience[]
  }[] = [];

  constructor(
    public dialog: MatDialog,
    private cvWorkExperienceService: CvWorkExperienceService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      this.dataRefactor = this.refactorData(this.data)
    });
  }

  refactorData(data: CvWorkExperience[]) {
    return data.reduce<{ isGroup: boolean, items: CvWorkExperience[] }[]>(
      (val, item) => {
        const s = val.length;
        let isAdd = true;
        if (s > 0) {
          const prev = val[s - 1];
          const prevItem = prev.items[prev.items.length - 1];
          if (prevItem.companyTag.id === item.companyTag.id) {
            prev.items.push(item);
            prev.isGroup = true;
            isAdd = false;
          }
        }
        if (isAdd) {
          val.push({
            isGroup: false,
            items: [item]
          })
        }
        return val;
      },
      []
    );
  }
}
