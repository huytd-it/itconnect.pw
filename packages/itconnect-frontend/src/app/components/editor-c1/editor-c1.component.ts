import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-editor-c1',
  templateUrl: './editor-c1.component.html',
  styleUrls: ['./editor-c1.component.scss']
})
export class EditorC1Component implements OnInit {
  @Input() form: FormGroup;
  @Input() name: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
