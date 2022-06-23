import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {WorkExperienceModalComponent} from "../work-experience-modal/work-experience-modal.component";
import {CvWorkExperienceService} from "../../../../../../services/cv-work-experience.service";
import {finalize} from "rxjs";
import {AppService} from "../../../../../../services/app.service";
import {CvWorkExperience} from "../../../../../../models/cv-work-experience.model";
import {CvEducation} from "../../../../../../models/cv-education.model";
import {CvEducationService} from "../../../../../../services/cv-education.service";
import {EducationModalComponent} from "../education-modal/education-modal.component";

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  @Output() onUpdate = new EventEmitter();
  data: CvEducation[] = [];

  constructor(
    public dialog: MatDialog,
    private cvEducationService: CvEducationService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    let flag = 1;
    this.cvEducationService.getOwner()
      .pipe(finalize(() => !--flag && this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.data = data;
      })
  }

  onAdd() {
    const dialogRef = this.dialog.open(EducationModalComponent, {
      maxWidth: '95vw',
      maxHeight: '95vh',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return
      }
      this.data = [result, ...this.data];
      this.onUpdate.emit();
    });
  }

  onEdit(item: CvEducation) {
    const dialogRef = this.dialog.open(EducationModalComponent, {
      maxWidth: '95vw',
      maxHeight: '95vh',
      data: item
    });

    dialogRef.afterClosed().subscribe((result: CvEducation)=> {
      if (!result) {
        return
      }
      const index = this.data.findIndex(item => item.id === result.id);
      this.data[index] = result;
      this.onUpdate.emit();
    });
  }

  onRemove(e: CvEducation) {
    this.appService.setHeadLoading(true);
    this.cvEducationService.delete(e.id)
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.data = this.data.filter(item => item.id !== e.id);
        this.onUpdate.emit();
      })
  }
}
