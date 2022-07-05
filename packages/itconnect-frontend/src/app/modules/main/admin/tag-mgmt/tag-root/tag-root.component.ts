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

export const TAG_ROOT_SERVICE_TOKEN = 'TAG_ROOT_SERVICE_TOKEN';

@Component({
  selector: 'app-tag-root',
  templateUrl: './tag-root.component.html',
  styleUrls: ['./tag-root.component.scss']
})
export class TagRootComponent implements OnInit, OnChanges {
  @Input() name: string;

  approveList = _.cloneDeep(approveList);
  approveSelected = this.approveList[0];
  orderField: string;
  order = 'DESC';
  displayedColumns: string[];

  search: string;
  data: PageInput<TaggedInput>;

  readonly AppRole = AppRole;

  constructor(
    @Inject(TAG_ROOT_SERVICE_TOKEN) private service: SkillService,
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
    const nameCap = _.capitalize(name);
    this.displayedColumns = [`${name}.id`, `${name}.name`, `job${nameCap}Count`, `user${nameCap}Count`, `${name}.isApprove`, 'action']
    this.orderField = `${name}.createdAt`;
    this.load();
  }

  load(page: number = 1, take: number = 10) {
    const query: SearchPageOutput = {
      search: this.search,
      order_field: this.orderField,
      order: <any>this.order,
      page,
      take,
      approve: this.approveSelected.value
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

  approve(item: TaggedInput) {
    this.appService.setHeadLoading(true);
    this.service.createOrEdit({
      ...item,
      isApprove: !item.isApprove
    })
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        item.isApprove = !item.isApprove;
      })
  }

  // @ts-ignore
  func = (...args: any[]) => this.service.createOrEdit(...args);

  edit(item: TaggedInput) {
    const dialogRef = this.dialog.open(TagFormModalComponent, {
      maxWidth: '95vw',
      maxHeight: '95vh',
      data: {
        data: item,
        func: this.func
      },
    });

    dialogRef.afterClosed().subscribe((result: TaggedInput)=> {
      this.load();
    });
  }

  announceSortChange(e: any) {
    this.orderField = e.active;
    this.order = e.direction.toUpperCase() || 'DESC';
    this.onSearch();
  }

  clickRow(r: TaggedInput) {
  }
}
