import {Component, OnInit} from '@angular/core';
import {CvWorkExperienceService} from "../../../../services/cv-work-experience.service";
import {AppService} from "../../../../services/app.service";
import {AppPermission} from 'src/app/models/permission.model';
import {
  CvWorkExperience,
  CvWorkExperienceSearchInput,
  CvWorkExperienceStatus
} from "../../../../models/cv-work-experience.model";
import {finalize} from "rxjs";
import {PageEvent} from "@angular/material/paginator";
import {AuthService} from "../../../../services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {
  WorkExperienceNextModalComponent
} from "../../components/work-experience-next-modal/work-experience-next-modal.component";
import {CvExperienceApplyModalComponent} from "./cv-experience-apply-modal/cv-experience-apply-modal.component";

@Component({
  selector: 'app-cv-experience-apply',
  templateUrl: './cv-experience-apply.component.html',
  styleUrls: ['./cv-experience-apply.component.scss']
})
export class CvExperienceApplyComponent implements OnInit {
  orderField = [
    {
      id: 1,
      name: 'Ngày Thêm',
      value: 'createdAt',
    },
  ]
  order = [
    {
      id: 1,
      name: 'Tăng dần',
      value: 'ASC',
    },
    {
      id: 2,
      name: 'Giảm dần',
      value: 'DESC'
    },
  ]

  orderFieldSelected = this.orderField[0];
  orderSelected = this.order[1];
  data: CvWorkExperienceSearchInput;
  readonly AppPermission = AppPermission;

  constructor(
    private cvWorkExperienceService: CvWorkExperienceService,
    private authService: AuthService,
    public appService: AppService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.load());
  }

  load(page: number = 1, take: number = 10) {
    this.appService.setHeadLoading(true);
    this.cvWorkExperienceService.search({
      status: CvWorkExperienceStatus.WaitVerify,
      companyId: this.authService.data?.user.companyInfo.id,
      order_field: this.orderFieldSelected.value,
      order: <any>this.orderSelected.value,
      page,
      take,
    }).pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.data = data;
      })
  }

  onSearch() {
    this.load();
  }

  onChangePage(e: PageEvent) {
    this.load(e.pageIndex + 1, e.pageSize);
  }

  onOpen(item: CvWorkExperience) {
    const dialogRef = this.dialog.open(CvExperienceApplyModalComponent, {
      maxWidth: '95vw',
      maxHeight: '95vh',
      data: item
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.data.data = this.data.data.filter(it => it.id != item.id);
      }
    });
  }
}

