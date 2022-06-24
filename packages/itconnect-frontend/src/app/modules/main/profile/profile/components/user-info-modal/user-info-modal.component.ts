import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CvWorkExperience} from "../../../../../../models/cv-work-experience.model";
import {UserInfo} from "../../../../../../models/user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PositionService} from "../../../../../../services/position.service";
import {SkillService} from "../../../../../../services/skill.service";
import {ProfileService} from "../../../../../../services/profile.service";
import {AppService} from "../../../../../../services/app.service";
import {JobLevelService} from "../../../../../../services/job-level.service";
import {validateInputAddressRequired} from "../../../../components/input-address/input-address.component";
import {SearchPageOutput} from "../../../../../../models/common";
import {CompleteUserProfileOutput} from "../../../../../../models/profile.model";
import {finalize} from "rxjs";
import {AuthService} from "../../../../../../services/auth.service";


export enum FormField {
  fullName = "fullName",
  phone = "phone",
  birthday = "birthday",
  address = "address",
  interest = "interest",
  objective = "objective",
  jobLevel = "jobLevel",
}

@Component({
  selector: 'app-user-info-modal',
  templateUrl: './user-info-modal.component.html',
  styleUrls: ['./user-info-modal.component.scss']
})
export class UserInfoModalComponent implements OnInit {
  form: FormGroup;

  readonly FormField = FormField;

  constructor(
    public dialogRef: MatDialogRef<UserInfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserInfo,
    private formBuilder: FormBuilder,
    private positionService: PositionService,
    private skillService: SkillService,
    private profileService: ProfileService,
    private appService: AppService,
    private jobLevelService: JobLevelService,
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
      [FormField.fullName]: [this.data.fullName, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      [FormField.phone]: [this.data.phone, Validators.pattern(/([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/)],
      [FormField.birthday]: [this.data.birthday, Validators.required],
      [FormField.address]: [address, validateInputAddressRequired],
      [FormField.interest]: [this.data.interest],
      [FormField.objective]: [this.data.objective],
      [FormField.jobLevel]: [this.data.jobLevel],
    });
  }

  isControlError(field: FormField, ...types: string[]) {
    const control = this.form.controls[field];
    if (control.invalid && (control.touched || control.dirty)) {
      return types.some(type => !!control?.errors?.[type]);
    }
    return false;
  }


  fetchJobLevel = (query: SearchPageOutput) => {
    return this.jobLevelService.search(query);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.value;
    const address = data[FormField.address];
    const dto: CompleteUserProfileOutput = {
      fullName: data[FormField.fullName],
      phone: data[FormField.phone],
      birthday: data[FormField.birthday],
      addressStreet: address.street,
      addressVillage: address.villageId.id,
      addressProvince: address.provinceId.id,
      addressDistrict: address.districtId.id,
      objective: data[FormField.objective],
      interest: data[FormField.interest],
      jobLevel: data[FormField.jobLevel]?.id
    }

    this.appService.setHeadLoading(true);
    this.profileService.createOrEditUser(dto)
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(val => {
        this.authService.preLoadUser();
        this.dialogRef.close();
      })
  }
}
