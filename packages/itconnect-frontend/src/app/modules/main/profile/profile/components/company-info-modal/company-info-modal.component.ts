import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProfileService} from "../../../../../../services/profile.service";
import {AppService} from "../../../../../../services/app.service";
import {CompleteCompanyProfileOutput, CompleteUserProfileOutput} from "../../../../../../models/profile.model";
import {finalize} from "rxjs";
import {AuthService} from "../../../../../../services/auth.service";
import {CompanyInfo} from "../../../../../../models/company-info.model";


export enum FormField {
  phone = "phone",
  introduce = "introduce",
}

@Component({
  selector: 'app-company-info-modal',
  templateUrl: './company-info-modal.component.html',
  styleUrls: ['./company-info-modal.component.scss']
})
export class CompanyInfoModalComponent implements OnInit {
  form: FormGroup;

  readonly FormField = FormField;

  constructor(
    public dialogRef: MatDialogRef<CompanyInfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CompanyInfo,
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private appService: AppService,
    private authService: AuthService
  ) { }

  onClose() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    const address = {
      street: this.data.addressStreet,
      villageId: this.data.addressVillage,
      provinceId: this.data.addressProvince,
      districtId: this.data.addressDistrict,
    };
    this.form = this.formBuilder.group({
      [FormField.phone]: [
        this.data.phone,
        [
          Validators.pattern(/([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/),
          Validators.required
        ]
      ],
      [FormField.introduce]: [this.data.introduce],
    });
  }

  isControlError(field: FormField, ...types: string[]) {
    const control = this.form.controls[field];
    if (control.invalid && (control.touched || control.dirty)) {
      return types.some(type => !!control?.errors?.[type]);
    }
    return false;
  }


  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.value;
    const dto: CompleteCompanyProfileOutput = {
      phone: data[FormField.phone],
      introduce: data[FormField.introduce],
    }

    this.appService.setHeadLoading(true);
    this.profileService.createOrEditCompany(dto)
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(val => {
        this.authService.preLoadUser(false);
        this.dialogRef.close();
      })
  }
}
