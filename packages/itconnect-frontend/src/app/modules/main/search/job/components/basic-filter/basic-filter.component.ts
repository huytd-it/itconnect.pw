import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageInput, SearchPageOutput} from "../../../../../../models/common";
import {Observable} from "rxjs";
import {FiltersProvider} from "../../../providers/filters.provider";

@Component({
  selector: 'app-basic-filter',
  templateUrl: './basic-filter.component.html',
  styleUrls: ['./basic-filter.component.scss']
})
export class BasicFilterComponent implements OnInit {
  @Output() onSearch = new EventEmitter();

  constructor(
    public filters: FiltersProvider
  ) { }

  ngOnInit(): void {
  }

}
