import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AppService} from "../../../../services/app.service";
import {FiltersProvider} from "./providers/filters.provider";
import {JobService} from "../../../../services/job.service";
import {JobSearchInput} from "../../../../models/job.model";
import {finalize, Subscription} from "rxjs";
import {MatPaginatorIntl, PageEvent} from "@angular/material/paginator";
import {
  CUSTOM_MAT_PAGINATOR_PER_PAGE_TOKEN,
  CustomMatPaginatorIntl
} from "../../../../utils/providers/custom-page.provider";
import {ActivatedRoute, Params, Router} from "@angular/router";

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
export class JobComponent implements OnInit, OnDestroy {
  @ViewChild('containerList') containerList: ElementRef;
  expandFilter: boolean;
  data: JobSearchInput;
  isLoading: boolean;
  querySubscription: Subscription;

  constructor(
    public filters: FiltersProvider,
    private jobService: JobService,
    private router: Router,
    private route: ActivatedRoute,
    public appService: AppService,
  ) {
  }

  ngOnInit(): void {
    this.querySubscription = this.route.queryParams.subscribe(query => {
      this.searchMiniFilter(query);
    })
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }

  onSearch(firstPage: boolean = true) {
    const query = this.filters.getQuery();
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

        // redirect to job top
        if (
          firstPage &&
          data.data?.length
        ) {
          this.router.navigate(
            [data.data[0].id.toString()],
            { relativeTo: this.route }
          ).then(() => {})
        }
      })
  }

  onChangePage(e: PageEvent) {
    const query = this.filters.getQuery();
    query.page = e.pageIndex + 1;
    query.take = e.pageSize;
    this.onSearch(false);
  }

  deleteMiniFilter() {
    this.filters.deleteMiniFilter();
    setTimeout(() => {
      this.onSearch();
    })
  }

  private searchMiniFilter(query: Params) {
    const r = this.filters.searchMiniFilter(query);
    if (r) {
      r.subscribe(() => {
        setTimeout(() => {
          this.onSearch();
        })
      })
    } else {
      setTimeout(() => this.onSearch());
    }
  }
}
