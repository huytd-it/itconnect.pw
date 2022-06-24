import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {AuthRegisterOutput} from "../../../models/auth.models";
import {catchError, throwError} from "rxjs";
import {RegisterField} from "./model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hidePwd: boolean | undefined = true;
  hideRePwd: boolean | undefined = true;

  submitting: boolean;
  form: FormGroup;
  readonly RegisterField = RegisterField;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      [RegisterField.email]: [null, [Validators.required, Validators.email]],
      [RegisterField.password]: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
      [RegisterField.rePassword]: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
    }, {
      validators: this.confirmedValidator(RegisterField.password, RegisterField.rePassword)
    })
  }

  isControlError(field: RegisterField, ...types: string[]) {
    const control = this.form.controls[field];
    if (control.invalid && (control.touched || control.dirty)) {
      return types.some(type => !!control?.errors?.[type]);
    }
    return false;
  }

  confirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onSubmit() {
    this.submitting = true;
    const value = this.form.value;
    const data: AuthRegisterOutput = {
      email: value[RegisterField.email],
      password: value[RegisterField.password]
    }

    this.authService.register(data)
      .pipe(catchError((err) => {
        this.submitting = false
        return throwError(err)
      }))
      .subscribe((response) => {
        this.router.navigate(['/u']).then(() => {});
      })
  }

}
