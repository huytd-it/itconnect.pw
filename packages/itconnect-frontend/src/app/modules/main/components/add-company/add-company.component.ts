import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SearchPageOutput} from "../../../../models/common";
import {Company3rdService} from "../../../../services/company-3rd.service";
import {Company3rd} from "../../../../models/company-3rd.model";
import {CompanyTagService} from "../../../../services/company-tag.service";
import {AppService} from "../../../../services/app.service";
import {finalize} from "rxjs";
import {CompanyTag} from "../../../../models/company-tag.model";

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {
  @Output() onAdd = new EventEmitter<CompanyTag>();
  infoAny: any;
  isAdd: boolean = false;

  get info(): Company3rd{
    return this.infoAny;
  }

  constructor(
    private company3rdService: Company3rdService,
    private companyTagService: CompanyTagService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
  }

  loadMoreFn = (query: SearchPageOutput) => {
    return this.company3rdService.search(query);
  }

  onSubmit() {
    this.appService.setHeadLoading(true);
    this.companyTagService.addMst({ mst: this.info.code })
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.isAdd = false;
        this.onAdd.emit(data);
        this.infoAny = null;
      })
  }
}
