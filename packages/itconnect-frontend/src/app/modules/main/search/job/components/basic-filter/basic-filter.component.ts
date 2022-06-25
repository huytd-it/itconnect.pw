import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageInput, SearchPageOutput} from "../../../../../../models/common";
import {Observable} from "rxjs";

@Component({
  selector: 'app-basic-filter',
  templateUrl: './basic-filter.component.html',
  styleUrls: ['./basic-filter.component.scss']
})
export class BasicFilterComponent implements OnInit {
  @Input() fetchDataCompanyTag: (query: SearchPageOutput) => Observable<PageInput<any>>;
  @Output() onAddCompanyTag = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

}
