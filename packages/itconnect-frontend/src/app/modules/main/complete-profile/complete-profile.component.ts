import {Component, OnInit, ViewChild} from '@angular/core';
import {EPosition} from "./model";
import {MatStepper} from "@angular/material/stepper";

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss']
})
export class CompleteProfileComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  positionSelected: EPosition;
  stepCompleted = 0;

  readonly EPosition = EPosition;

  constructor() { }

  ngOnInit(): void {
  }

  onNextPosition(e: EPosition) {
    this.stepCompleted = 1;
    this.positionSelected = e;
    setTimeout(() => {
      this.stepper.next();
    })
  }

  onCompleteProfile() {
    this.stepCompleted = 2;
    setTimeout(() => {
      this.stepper.next();
    })
  }
}
