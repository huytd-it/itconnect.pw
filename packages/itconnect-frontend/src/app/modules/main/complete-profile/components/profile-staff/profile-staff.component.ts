import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {faInfoCircle, faPersonBooth} from "@fortawesome/free-solid-svg-icons";
import {faConnectdevelop} from "@fortawesome/free-brands-svg-icons";
import {OptionItem, SearchPageOutput} from "../../../../../models/common";
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {validateInputAddressRequired} from "../../../components/input-address/input-address.component";
import {AddressSearchOutput} from "../../../../../models/address.model";
import {PositionService} from "../../../../../services/position.service";
import {SkillService} from "../../../../../services/skill.service";
import {PositionSearchOutput} from "../../../../../models/position.model";
import {SkillSearchOutput} from "../../../../../models/skill.model";
import {ProfileService} from "../../../../../services/profile.service";
import {CompleteUserProfileOutput} from "../../../../../models/profile.model";
import {catchError, finalize} from "rxjs";
import {AppService} from "../../../../../services/app.service";

export interface ConfigFieldItem extends OptionItem {
  require?: boolean;
}

export enum FormField {
  fullName = "fullName",
  phone = "phone",
  birthday = "birthday",
  address = "address",
  skills = "skills",
  positions = "positions"
}

@Component({
  selector: 'app-profile-staff',
  templateUrl: './profile-staff.component.html',
  styleUrls: ['./profile-staff.component.scss']
})
export class ProfileStaffComponent implements OnInit {
  faInfoCircle = faInfoCircle;
  faConnectDevelop = faConnectdevelop;
  form: FormGroup;
  @Output() onCompleteProfile = new EventEmitter();
  @Output() onBack = new EventEmitter();

  readonly FormField = FormField;

  constructor(
    private formBuilder: FormBuilder,
    private positionService: PositionService,
    private skillService: SkillService,
    private profileService: ProfileService,
    private appService: AppService
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      [FormField.fullName]: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      [FormField.phone]: [null, Validators.pattern(/([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/)],
      [FormField.birthday]: [null, Validators.required],
      [FormField.address]: [null, validateInputAddressRequired],
      [FormField.skills]: [null, Validators.required],
      [FormField.positions]: [null, Validators.required],
    })
  }

  isControlError(field: FormField, ...types: string[]) {
    const control = this.form.controls[field];
    if (control.invalid && (control.touched || control.dirty)) {
      return types.some(type => !!control?.errors?.[type]);
    }
    return false;
  }


  fetchDataPosition = (query: SearchPageOutput) => {
    const qr: PositionSearchOutput = query;
    return this.positionService.search(qr);
  }

  fetchDataSkill = (query: SearchPageOutput) => {
    const qr: SkillSearchOutput = query;
    return this.skillService.search(qr);
  }

  onSubmit() {
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
      skills: data[FormField.skills],
      positions: data[FormField.positions]
    }

    this.appService.setHeadLoading(true);
    this.profileService.completeUser(dto)
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(val => {
        this.onCompleteProfile.emit();
      })
  }
}
