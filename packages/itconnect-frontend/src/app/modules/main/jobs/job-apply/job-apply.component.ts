import {Component, OnInit} from '@angular/core';
import {JobApplyService} from "../../../../services/job-apply.service";
import {AppService} from "../../../../services/app.service";
import {delay, finalize, lastValueFrom, retryWhen, take} from "rxjs";
import {JobApply, JobApplySearchInput, JobApplyStatus} from "../../../../models/job-apply.model";
import {PageEvent} from "@angular/material/paginator";
import {AppPermission} from 'src/app/models/permission.model';
import * as moment from "moment";
import {
  WorkExperienceNextModalComponent
} from "../../components/work-experience-next-modal/work-experience-next-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {CvWorkExperience, CvWorkExperienceStatus} from "../../../../models/cv-work-experience.model";
import {JobService} from "../../../../services/job.service";

@Component({
  selector: 'app-job-apply',
  templateUrl: './job-apply.component.html',
  styleUrls: ['./job-apply.component.scss']
})
export class JobApplyComponent implements OnInit {
  orderField = [
    {
      id: 1,
      name: 'Ngày Thêm',
      value: 'jobApply.createdAt',
    },
    {
      id: 2,
      name: 'Tên công việc',
      value: 'job.name'
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
  orderSelected = this.order[1];
  orderFieldSelected = this.orderField[0];

  search: string;
  data: JobApplySearchInput;
  readonly AppPermission = AppPermission;
  readonly JobApplyStatus = JobApplyStatus;

  constructor(
    private jobApplyService: JobApplyService,
    private jobService: JobService,
    public appService: AppService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.load());
  }

  checkPublish(item: JobApply) {
    return moment(item.job.endDate).isSameOrAfter(moment());
  }

  load(page: number = 1, take: number = 10) {
    this.appService.setHeadLoading(true);
    this.jobApplyService.search({
      search: this.search,
      order_field: this.orderFieldSelected.value,
      order: <any>this.orderSelected.value,
      page,
      take
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

  onCancel(item: JobApply) {
    this.appService.setHeadLoading(true);
    this.jobApplyService.delete(item.id)
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.data.data = this.data.data.filter(it => it.id != item.id);
        this.data.meta.itemCount--;
      })
  }

  async onAccept(item: JobApply) {
    this.appService.setHeadLoading(true);
    const job = await lastValueFrom(
      this.jobService.getById(item.job.id)
        .pipe(finalize(() => this.appService.setHeadLoading(false)))
    );
    const dialogRef = this.dialog.open(WorkExperienceNextModalComponent, {
      maxWidth: '95vw',
      maxHeight: '95vh',
      data: {
        companyTag: job.companyTag,
        cvWorkExperiencePositions: job.jobPositions as any,
        cvWorkExperienceSkills: job.jobSkills as any,
        jobType: job.jobType,
        jobLevel: job.jobJobLevels?.[0]?.jobLevel,
        workFrom: job.jobWorkFrom?.[0]?.workFrom,
        status: CvWorkExperienceStatus.Verify,
        startDate: moment(item.job.createdAt).startOf('month').subtract(1, 'month').toDate(),
        newData: true
      } as CvWorkExperience & { newData: boolean }
    });

    dialogRef.afterClosed().subscribe((result: {reload: boolean}) => {
      if (result.reload) {
        this.appService.setHeadLoading(true);
        this.jobApplyService.create({
          id: item.id,
          status: JobApplyStatus.RequestAccept
        })
          .pipe(finalize(() => this.appService.setHeadLoading(false)))
          .subscribe(data => {
            const index = this.data.data.findIndex(it => it.id === item.id);
            this.data.data[index].status = JobApplyStatus.RequestAccept;
            this.data = {...this.data};
          })
      }
    });
  }

  onDenide(item: JobApply) {
    this.appService.setHeadLoading(true);
    this.jobApplyService.create({
      id: item.id,
      status: JobApplyStatus.RequestDenide
    })
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        const index = this.data.data.findIndex(it => it.id === item.id);
        this.data.data[index].status = JobApplyStatus.RequestDenide;
        this.data = {...this.data};
      })
  }
}
