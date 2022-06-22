import { Component, OnInit } from '@angular/core';
import {faArrowDown, faArrowRight} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-work-experience-modal',
  templateUrl: './work-experience-modal.component.html',
  styleUrls: ['./work-experience-modal.component.scss']
})
export class WorkExperienceModalComponent implements OnInit {
  faArrowRight = faArrowRight;
  faArrowDown = faArrowDown;

  constructor() { }

  ngOnInit(): void {
  }

}
