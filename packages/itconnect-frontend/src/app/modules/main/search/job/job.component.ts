import { Component, OnInit } from '@angular/core';
import {AppService} from "../../../../services/app.service";
import {FiltersProvider} from "../providers/filters.provider";

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
  providers: [
    FiltersProvider
  ]
})
export class JobComponent implements OnInit {
  expandFilter: boolean = true;

  constructor(
    private appService: AppService,
  ) { }

  ngOnInit(): void {
  }


}
