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
      id: EPosition.Company,
      name: 'Nhà tuyển dụng',
      tooltip: 'Doanh nghiệp, tổ chức,...'
    },
    {
      id: EPosition.User,
      name: 'Người tìm việc',
      tooltip: ''
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.onNextPosition.emit(this.positionSelected)
  }
}
