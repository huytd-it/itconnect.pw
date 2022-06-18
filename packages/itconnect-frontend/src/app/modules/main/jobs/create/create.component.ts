import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PositionService} from "../../../../services/position.service";
import {SkillService} from "../../../../services/skill.service";
import {ProfileService} from "../../../../services/profile.service";
import {AppService} from "../../../../services/app.service";
import {validateInputAddressRequired} from "../../components/input-address/input-address.component";
import {SearchPageOutput} from "../../../../models/common";
import {PositionSearchOutput} from "../../../../models/position.model";
import {SkillSearchOutput} from "../../../../models/skill.model";

export enum FormField {
  skills = "skills",
  positions = "positions"
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  form: FormGroup;

  readonly FormField = FormField;

  constructor(
    private formBuilder: FormBuilder,
    private positionService: PositionService,
    private skillService: SkillService,
    private appService: AppService
  ) {
    this.form = this.formBuilder.group({
      [FormField.skills]: [null, Validators.required],
      [FormField.positions]: [null, Validators.required],
    })
  }

  ngOnInit(): void {
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
}
