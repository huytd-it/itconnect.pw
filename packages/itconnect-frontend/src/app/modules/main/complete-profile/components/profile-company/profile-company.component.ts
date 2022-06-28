import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {faBuilding} from "@fortawesome/free-solid-svg-icons";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProfileService} from "../../../../../services/profile.service";
import {AppService} from "../../../../../services/app.service";
import {validateInputAddressRequired} from "../../../components/input-address/input-address.component";
import {CompleteCompanyProfileOutput} from "../../../../../models/profile.model";
import {finalize} from "rxjs";
import {SearchPageOutput} from "../../../../../models/common";
import {Company3rdService} from "../../../../../services/company-3rd.service";
import {Company3rd} from "../../../../../models/company-3rd.model";

export enum FormField {
  companyMst = "companyMst",
  phone = "phone",
}

@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.component.html',
  styleUrls: ['./profile-company.component.scss']
})
export class ProfileCompanyComponent implements OnInit {
  faBuilding = faBuilding;
  form: FormGroup;
  @Output() onCompleteProfile = new EventEmitter();
  @Output() onBack = new EventEmitter();

  get info(): Company3rd {
    return this.form.value[FormField.companyMst];
  }

  readonly FormField = FormField;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private appService: AppService,
    private company3rdService: Company3rdService
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      [FormField.companyMst]: [null, Validators.required],
      [FormField.phone]: [null, [Validators.pattern(/([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/), Validators.required]],
    })
  }

  isControlError(field: FormField, ...types: string[]) {
    const control = this.form.controls[field];
    if (control.invalid && (control.touched || control.dirty)) {
      return types.some(type => !!control?.errors?.[type]);
    }
    return false;
  }

  loadMoreCompany3rd = (query: SearchPageOutput) => {
    return this.company3rdService.search(query);
  }

  onSubmit() {
    const data = this.form.value;
    const dto: CompleteCompanyProfileOutput = {
      companyMst: data[FormField.companyMst]?.code,
      phone: data[FormField.phone],
    }

    this.appService.setHeadLoading(true);
    this.profileService.createOrEditCompany(dto)
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(val => {
        this.onCompleteProfile.emit();
      })
  }

}
