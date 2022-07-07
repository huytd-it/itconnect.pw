import {Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {WorkExperienceModalComponent} from "../work-experience-modal/work-experience-modal.component";
import {CvWorkExperienceService} from "../../../../../../services/cv-work-experience.service";
import {finalize, map} from "rxjs";
import {AppService} from "../../../../../../services/app.service";
import {CvWorkExperience} from "../../../../../../models/cv-work-experience.model";

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss']
})
export class WorkExperienceComponent implements OnInit {
  @Output() onUpdate = new EventEmitter();
  data: CvWorkExperience[] = [];
  dataRefactor: {
    isGroup: boolean,
    items: CvWorkExperience[]
  }[] = [];

  constructor(
    public dialog: MatDialog,
    private cvWorkExperienceService: CvWorkExperienceService,
    private appService: AppService
  ) {
  }


  ngOnInit(): void {
    this.load()
  }

  onAdd() {
    const dialogRef = this.dialog.open(WorkExperienceModalComponent, {
      maxWidth: '95vw',
      maxHeight: '95vh',
    });

    dialogRef.afterClosed().subscribe((result: {reload: boolean, data: CvWorkExperience}) => {
      if (!result) {
        return
      }
      if (result.reload) {
        this.load();
        return;
      }
      const r = result.data;
      this.data = [r, ...this.data];
      this.dataRefactor = this.refactorData(this.data);
      this.onUpdate.emit();
    });
  }

  onEdit(item: CvWorkExperience) {
    const dialogRef = this.dialog.open(WorkExperienceModalComponent, {
      maxWidth: '95vw',
      maxHeight: '95vh',
      data: item
    });

    dialogRef.afterClosed().subscribe((result: {reload: boolean, data: CvWorkExperience})=> {
      if (!result) {
        return
      }
      if (result.reload) {
        this.load();
        return;
      }
      const r = result.data;
      const index = this.data.findIndex(item => item.id === r.id);
      this.data[index] = r;
      this.dataRefactor = this.refactorData(this.data);
      this.onUpdate.emit();
    });
  }

  onRemove(e: CvWorkExperience) {
    this.appService.setHeadLoading(true);
    this.cvWorkExperienceService.delete(e.id)
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.data = this.data.filter(item => item.id !== e.id);
        this.dataRefactor = this.refactorData(this.data);
        this.onUpdate.emit();
      })
  }

  private load() {
    let flag = 1;
    this.cvWorkExperienceService.getOwner()
      .pipe(finalize(() => !--flag && this.appService.setHeadLoading(false)))
      .pipe(map(data => {
        this.data = data;
        return this.refactorData(data);
      }))
      .subscribe(data => {
        this.dataRefactor = data;
      })
  }

  onReload() {
    this.load();
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
