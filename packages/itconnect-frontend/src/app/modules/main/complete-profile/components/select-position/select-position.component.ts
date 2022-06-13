import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-position',
  templateUrl: './select-position.component.html',
  styleUrls: ['./select-position.component.scss']
})
export class SelectPositionComponent implements OnInit {
  list = [
    {
      id: 1,
      name: 'Nhà tuyển dụng',
      tooltip: 'Doanh nghiệp, tổ chức,...'
    },
    {
      id: 2,
      name: 'Người tìm việc',
      tooltip: ''
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
