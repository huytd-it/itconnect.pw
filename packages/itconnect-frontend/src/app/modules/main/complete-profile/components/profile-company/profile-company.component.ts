import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {faBuilding} from "@fortawesome/free-solid-svg-icons";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProfileService} from "../../../../../services/profile.service";
import {AppService} from "../../../../../services/app.service";
import {validateInputAddressRequired} from "../../../components/input-address/input-address.component";
import {CompleteCompanyProfileOutput} from "../../../../../models/profile.model";
import {finalize} from "rxjs";

export enum FormField {
  companyName = "companyName",
  phone = "phone",
  dayEstablish = "birthday",
  address = "address",
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

  readonly FormField = FormField;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private appService: AppService
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      [FormField.companyName]: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      [FormField.phone]: [null, Validators.pattern(/([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/)],
      [FormField.dayEstablish]: [null, Validators.required],
      [FormField.address]: [null, validateInputAddressRequired],
    })
  }

  isControlError(field: FormField, ...types: string[]) {
    const control = this.form.controls[field];
    if (control.invalid && (control.touched || control.dirty)) {
      return types.some(type => !!control?.errors?.[type]);
    }
    return false;
  }

  onSubmit() {
    const data = this.form.value;
    const address = data[FormField.address];
    const dto: CompleteCompanyProfileOutput = {
      companyName: data[FormField.companyName],
      phone: data[FormField.phone],
      dayEstablish: data[FormField.dayEstablish],
      addressStreet: address.street,
      addressVillage: address.villageId.id,
      addressProvince: address.provinceId.id,
      addressDistrict: address.districtId.id,
    }

    this.appService.setHeadLoading(true);
    this.profileService.createOrEditCompany(dto)
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(val => {
        this.onCompleteProfile.emit();
      })
  }

}
