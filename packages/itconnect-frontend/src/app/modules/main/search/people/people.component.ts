import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AppService} from "../../../../services/app.service";
import {FiltersProvider} from "./providers/filters.provider";
import {JobService} from "../../../../services/job.service";
import {JobSearchInput} from "../../../../models/job.model";
import {finalize} from "rxjs";
import {MatPaginatorIntl, PageEvent} from "@angular/material/paginator";
import {
  CUSTOM_MAT_PAGINATOR_PER_PAGE_TOKEN,
  CustomMatPaginatorIntl
} from "../../../../utils/providers/custom-page.provider";
import {ActivatedRoute, Router} from "@angular/router";
import {PeopleService} from "../../../../services/people.service";
import {PeopleSearchInput} from "../../../../models/people.model";
import {UserInfo} from "../../../../models/user.model";
import * as moment from "moment";

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  providers: [
    FiltersProvider,
    {
      provide: CUSTOM_MAT_PAGINATOR_PER_PAGE_TOKEN,
      useValue: 'Người dùng trên trang'
    },
    {
      provide: MatPaginatorIntl,
      useClass: CustomMatPaginatorIntl
    }
  ]
})
export class PeopleComponent implements OnInit {
  @ViewChild('containerList') containerList: ElementRef;
  expandFilter: boolean;
  data: PeopleSearchInput;
  isLoading: boolean;

  constructor(
    private filters: FiltersProvider,
    private peopleService: PeopleService,
    private router: Router,
    private route: ActivatedRoute,
    public appService: AppService,
  ) {
  }

  ngOnInit(): void {
    setTimeout(() => this.onSearch());
  }


  onSearch(firstPage: boolean = true) {
    const query = this.filters.getQuery();
    const body = this.filters.getBody();

    if (firstPage) {
      query.take = 10;
      query.page = 1;
    }

    this.appService.setHeadLoading(true);
    this.peopleService.search(query, body)
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.containerList.nativeElement.scrollTop = 0;
        this.data = data;
      })
  }

  onChangePage(e: PageEvent) {
    const query = this.filters.getQuery();
    query.page = e.pageIndex + 1;
    query.take = e.pageSize;
    this.onSearch(false);
  }

  getYoe(item: UserInfo) {
    return this.peopleService.getYoe(item);
  }
}
