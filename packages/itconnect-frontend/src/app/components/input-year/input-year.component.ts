import {Component, Input, OnInit} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import * as moment from 'moment';
import {Moment} from 'moment';
import {Form, FormControl, FormGroup} from "@angular/forms";
import {MatDatepicker} from "@angular/material/datepicker";

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-input-year',
  templateUrl: './input-year.component.html',
  styleUrls: ['./input-year.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class InputYearComponent implements OnInit {
  @Input() label: string;
  @Input() form: FormGroup;
  @Input() name: string;
  @Input() maxDate: Date;
  @Input() minDate: Date;

  get formControl() {
    return this.form.controls[this.name];
  }

  constructor() { }

  ngOnInit(): void {
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<any>) {
    let ctrlValue = this.formControl.value!;
    if (!ctrlValue) {
      ctrlValue = moment();
    }
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.formControl.setValue(ctrlValue);
    datepicker.close();
  }


  isControlError(...types: string[]) {
    const control = this.formControl;
    if (control.invalid && (control.touched || control.dirty)) {
      return types.some(type => !!control?.errors?.[type]);
    }
    return false;
  }

}
