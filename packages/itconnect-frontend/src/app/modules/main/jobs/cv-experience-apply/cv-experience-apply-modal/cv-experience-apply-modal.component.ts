import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CvWorkExperience} from "../../../../../models/cv-work-experience.model";
import {CvWorkExperienceService} from "../../../../../services/cv-work-experience.service";
import {AppService} from "../../../../../services/app.service";
import {finalize} from "rxjs";

@Component({
  selector: 'app-cv-experience-apply-modal',
  templateUrl: './cv-experience-apply-modal.component.html',
  styleUrls: ['./cv-experience-apply-modal.component.scss']
})
export class CvExperienceApplyModalComponent implements OnInit {

  constructor(
    private cvWorkExperienceService: CvWorkExperienceService,
    private appService: AppService,
    public dialogRef: MatDialogRef<CvExperienceApplyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CvWorkExperience,
  ) { }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogRef.close()
  }

  onSubmit(status: boolean = true) {
    this.appService.setHeadLoading(true);
    this.cvWorkExperienceService.apply({
      id: this.data.id,
      apply: status
    }).pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.dialogRef.close(true)
      })
  }
}
