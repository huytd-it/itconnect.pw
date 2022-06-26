import { Component, OnInit } from '@angular/core';
import {FiltersProvider} from "../../../providers/filters.provider";
import {JobSearchBodyOutput, JobSearchOutput} from "../../../../../../models/job.model";
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-full-filter',
  templateUrl: './full-filter.component.html',
  styleUrls: ['./full-filter.component.scss']
})
export class FullFilterComponent implements OnInit {
  faArrowDown = faArrowDown;

  constructor(
    public filters: FiltersProvider
  ) { }

  ngOnInit(): void {
  }

  onSearch() {
  }
}
