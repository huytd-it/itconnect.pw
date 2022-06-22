import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {OptionItem, PageOutput, SearchPageOutput} from "../../../../../models/common";
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {validateInputAddressRequired} from "../../../components/input-address/input-address.component";
import {PositionService} from "../../../../../services/position.service";
import {SkillService} from "../../../../../services/skill.service";
import {ProfileService} from "../../../../../services/profile.service";
import {CompleteUserProfileOutput} from "../../../../../models/profile.model";
import {catchError, finalize} from "rxjs";
import {AppService} from "../../../../../services/app.service";
import {JobLevelService} from "../../../../../services/job-level.service";

export interface ConfigFieldItem extends OptionItem {
  require?: boolean;
}

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
  selector: 'app-profile-staff',
  templateUrl: './profile-staff.component.html',
  styleUrls: ['./profile-staff.component.scss']
})
export class ProfileStaffComponent implements OnInit {
  form: FormGroup;
  @Output() onCompleteProfile = new EventEmitter();
  @Output() onBack = new EventEmitter();

  readonly FormField = FormField;

  constructor(
    private formBuilder: FormBuilder,
    private positionService: PositionService,
    private skillService: SkillService,
    private profileService: ProfileService,
    private appService: AppService,
    private jobLevelService: JobLevelService,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      [FormField.fullName]: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      [FormField.phone]: [null, Validators.pattern(/([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/)],
      [FormField.birthday]: [null, Validators.required],
      [FormField.address]: [null, validateInputAddressRequired],
      [FormField.interest]: [''],
      [FormField.objective]: [''],
      [FormField.jobLevel]: [null],
    })
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
        this.onCompleteProfile.emit();
      })
  }
}
