import {Component, Inject, INJECTOR, Injector, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {User, UserSearchInput, UserSearchOutput, UserType} from "../../../../../models/user.model";
import {AppService} from "../../../../../services/app.service";
import {Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {AppRole} from 'src/app/models/permission.model';
import {Approve, approveList, PageInput, SearchPageOutput, TaggedInput} from "../../../../../models/common";
import * as _ from "lodash";
import {PositionService} from "../../../../../services/position.service";
import {finalize} from "rxjs";
import {SkillService} from "../../../../../services/skill.service";
import {MatDialog} from "@angular/material/dialog";
import {
  CompanyInfoModalComponent
} from "../../../profile/profile/components/company-info-modal/company-info-modal.component";
import {CvWorkExperience} from "../../../../../models/cv-work-experience.model";
import {TagFormModalComponent} from "../tag-form-modal/tag-form-modal.component";
import {WorkFromService} from "../../../../../services/work-from.service";
import {TagFormModal2Component} from "../tag-form-modal-2/tag-form-modal-2.component";

export const TAG_ROOT_SERVICE_TOKEN_2 = 'TAG_ROOT_SERVICE_TOKEN_2';

@Component({
  selector: 'app-tag-root-2',
  templateUrl: './tag-root-2.component.html',
  styleUrls: ['./tag-root-2.component.scss']
})
export class TagRoot2Component implements OnInit, OnChanges {
  @Input() name: string;

  orderField: string;
  order = 'DESC';
  displayedColumns: string[];

  search: string;
  data: PageInput<TaggedInput>;

  readonly AppRole = AppRole;

  constructor(
    @Inject(TAG_ROOT_SERVICE_TOKEN_2) private service: WorkFromService,
    public appService: AppService,
    private router: Router,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const {name} = changes;
    if (name && name.currentValue && name.currentValue != name.previousValue) {
      this.init();
    }
  }

  init() {
    const name = this.name;
    this.displayedColumns = [
      `id`,
      `name`,
      'createdAt',
      'action'
    ]
    this.orderField = `createdAt`;
    this.load();
  }

  load(page: number = 1, take: number = 10) {
    const query: SearchPageOutput = {
      search: this.search,
      order_field: this.orderField,
      order: <any>this.order,
      page,
      take,
    }
    this.appService.setHeadLoading(true);
    this.service.search(query)
        .pipe(finalize(() => this.appService.setHeadLoading(false)))
        .subscribe(data => {
          this.data = <any>data;
        })
  }

  onSearch() {
    this.load();
  }

  onChangePage(e: PageEvent) {
    this.load(e.pageIndex + 1, e.pageSize);
  }

  // @ts-ignore
  func = (...args: any[]) => this.service.createOrEdit(...args);

  edit(item?: TaggedInput) {
    const dialogRef = this.dialog.open(TagFormModal2Component, {
      maxWidth: '95vw',
      maxHeight: '95vh',
      data: {
        data: item,
        func: this.func
      },
    });

    dialogRef.afterClosed().subscribe((result: TaggedInput)=> {
      if (this.data?.data) {
        const index = this.data.data.findIndex(item => item?.id == result.id);
        if (index > -1) {
          this.data.data[index] = result;
          this.data.data = [...this.data.data];
        } else {
          this.data.data = [result, ...this.data.data];
        }
      } else {
        this.data = <any>{
          data: [result]
        }
      }
    });
  }

  announceSortChange(e: any) {
    this.orderField = e.active;
    this.order = e.direction.toUpperCase() || 'DESC';
    this.onSearch();
  }

  clickRow(r: TaggedInput) {
  }

  onAdd() {
    this.edit();
  }
}
