import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AppService} from "../../../../services/app.service";
import {FiltersProvider} from "../providers/filters.provider";
import {JobService} from "../../../../services/job.service";
import {JobSearchInput} from "../../../../models/job.model";
import {finalize} from "rxjs";
import {MatPaginatorIntl, PageEvent} from "@angular/material/paginator";
import {
  CUSTOM_MAT_PAGINATOR_PER_PAGE_TOKEN,
  CustomMatPaginatorIntl
} from "../../../../utils/providers/custom-page.provider";

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
  providers: [
    FiltersProvider,
    {
      provide: CUSTOM_MAT_PAGINATOR_PER_PAGE_TOKEN,
      useValue: 'Việc làm trên trang'
    },
    {
      provide: MatPaginatorIntl,
      useClass: CustomMatPaginatorIntl
    }
  ]
})
export class JobComponent implements OnInit {
  @ViewChild('containerList') containerList: ElementRef;
  expandFilter: boolean;
  data: JobSearchInput;
  isLoading: boolean;

  constructor(
    private filters: FiltersProvider,
    private jobService: JobService,
    public appService: AppService,
  ) {
  }

  ngOnInit(): void {
    setTimeout(() => this.onSearch());
  }


  onSearch(firstPage: boolean = true) {
    const query = this.filters.query;
    const body = this.filters.getBody();

    if (firstPage) {
      query.take = 10;
      query.page = 1;
    }

    this.appService.setHeadLoading(true);
    this.jobService.search(query, body)
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.containerList.nativeElement.scrollTop = 0;
        this.data = data;
      })
  }

  onChangePage(e: PageEvent) {
    const query = this.filters.query;
    query.page = e.pageIndex + 1;
    query.take = e.pageSize;
    this.onSearch(false);
  }
}
