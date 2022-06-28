import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EPosition} from "../../model";


@Component({
  selector: 'app-select-position',
  templateUrl: './select-position.component.html',
  styleUrls: ['./select-position.component.scss']
})
export class SelectPositionComponent implements OnInit {
  @Output() onNextPosition = new EventEmitter<EPosition>();
  positionSelected: EPosition;
  list = [
    {
      id: EPosition.User,
      name: 'Cá nhân',
      tooltip: ''
    },
    {
      id: EPosition.Company,
      name: 'Công ty',
      tooltip: 'Doanh nghiệp, tổ chức,...'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.onNextPosition.emit(this.positionSelected)
  }
}
