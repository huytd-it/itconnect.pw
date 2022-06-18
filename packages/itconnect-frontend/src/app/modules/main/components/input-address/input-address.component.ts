import {Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {AddressService} from "../../../../services/address.service";
import {OptionItem, SearchPageOutput} from "../../../../models/common";
import {AddressSearchOutput, EAddressType} from "../../../../models/address.model";
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validators
} from "@angular/forms";
import {Subscription} from "rxjs";

enum FormField {
  street = 'street',
  province = 'provinceId',
  district = 'districtId',
  village = 'villageId',
}

export function validateInputAddressRequired(c: FormControl) {
  const value = c.value;
  if (
    value &&
    value[FormField.street] &&
    value[FormField.province]?.id &&
    value[FormField.district]?.id &&
    value[FormField.village]?.id
  ) {
    console.log('het')
    return null;
  }
  return {
    required: true
  }
}

@Component({
  selector: 'app-input-address',
  templateUrl: './input-address.component.html',
  styleUrls: ['./input-address.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputAddressComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useValue: validateInputAddressRequired,
      multi: true
    }
  ]
})
export class InputAddressComponent implements OnInit, OnDestroy, ControlValueAccessor {
  form: FormGroup;

  private formChangeSubscription: Subscription;
  private funChangeValueControl: (data: any) => void;
  private funTouchedValueControl: () => void;

  readonly FormField = FormField;

  constructor(
    private addressService: AddressService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnDestroy(): void {
    this.formChangeSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      [FormField.province]: [null, Validators.required],
      [FormField.district]: [null, Validators.required],
      [FormField.village]: [null, Validators.required],
      [FormField.street]: [null, Validators.required],
    })
    this.formChangeSubscription = this.form.valueChanges.subscribe(value => {
      this.funChangeValueControl?.(value);
    })
  }

  fetchData = (type: FormField) => (query: SearchPageOutput) => {
    const queryAddress: AddressSearchOutput = query;
    const parentField = this.getParentField(type);
    if (parentField) {
      const parentId = (this.form.controls[parentField].value as OptionItem).id;
      queryAddress.parentId = parentId;
    }
    const typeField = this.getTypeField(type);
    if (typeField) {
      queryAddress.type = typeField;
    }
    return this.addressService.search(queryAddress);
  }

  isControlError(field: FormField, ...types: string[]) {
    const control = this.form.controls[field];
    if (control.invalid && (control.touched || control.dirty)) {
      return types.some(type => !!control?.errors?.[type]);
    }
    return false;
  }

  isControlDisable(field: FormField) {
    const parentField = this.getParentField(field);
    if (parentField) {
      return !this.form.controls[parentField].value;
    }
    return false;
  }

  getParentField(field: FormField) {
    switch (field) {
      case FormField.district:
        return FormField.province;

      case FormField.village:
        return FormField.district;
    }
    return false;
  }

  getTypeField(field: FormField) {
    switch (field) {
      case FormField.district: return EAddressType.district;
      case FormField.province: return EAddressType.province;
      case FormField.village: return EAddressType.village;
    }
    return false;
  }

  onChange(e: OptionItem, field: FormField) {
    switch (field) {
      // @ts-ignore
      case FormField.province:
        const controlDistrict = this.form.controls[FormField.district];
        controlDistrict.setValue(null);
        controlDistrict.setErrors(null);
        // non breaks -> continue flow

      case FormField.district:
        const controlVillage = this.form.controls[FormField.village];
        controlVillage.setValue(null);
        controlVillage.setErrors(null);
    }
  }

  writeValue(obj: any): void {
    if (obj) {
      console.log(obj);
      this.form.setValue(obj);
    }
  }

  registerOnChange(fn: any): void {
    this.funChangeValueControl = fn;
  }

  registerOnTouched(fn: any): void {
  }

}
