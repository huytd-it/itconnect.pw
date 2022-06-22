import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {WorkExperienceModalComponent} from "../work-experience-modal/work-experience-modal.component";

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss']
})
export class WorkExperienceComponent implements OnInit {


  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  onAdd() {
    const dialogRef = this.dialog.open(WorkExperienceModalComponent, {
      maxWidth: '95vw',
      maxHeight: '95vh',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
