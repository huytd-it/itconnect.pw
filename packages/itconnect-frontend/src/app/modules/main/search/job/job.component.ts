import { Component, OnInit } from '@angular/core';
import {CompanyTagService} from "../../../../services/company-tag.service";
import {SearchPageOutput} from "../../../../models/common";
import {CompanyTagSearchOutput} from "../../../../models/company-tag.model";
import {finalize} from "rxjs";
import {AppService} from "../../../../services/app.service";

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  expandFilter: boolean = true;

  constructor(
    private companyTagService: CompanyTagService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
  }

  fetchDataCompanyTag = (query: SearchPageOutput) => {
    const qr: CompanyTagSearchOutput = query;
    return this.companyTagService.search(qr);
  }

  onAddCompanyTag(e: string) {
    this.appService.setHeadLoading(true);
    this.companyTagService.createTag({ name: e })
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe((data) => {
        // this.form.controls[FormField.companyTag].setValue(data);
        // this.selectCompany.close();
      })
  }

}
