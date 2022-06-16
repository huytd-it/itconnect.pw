import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {LoginField} from "./model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthLoginInput, AuthLoginOutput} from "../../../models/auth.models";
import {Router} from "@angular/router";
import {catchError, throwError} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hidePassword: boolean | undefined = true;
  submitting: boolean;
  form: FormGroup;
  readonly LoginField = LoginField;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      [LoginField.email]: [null, [Validators.required, Validators.email]],
      [LoginField.password]: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
    })
  }

  isControlError(field: LoginField, ...types: string[]) {
    const control = this.form.controls[field];
    if (control.invalid && (control.touched || control.dirty)) {
      return types.some(type => !!control?.errors?.[type]);
    }
    return false;
  }

  onSubmit() {
    const value = this.form.value;
    const data: AuthLoginOutput = {
      email: value[LoginField.email],
      password: value[LoginField.password]
    }

    this.submitting = true;
    this.authService.login(data)
      .pipe(catchError((err) => {
        this.submitting = false
        return throwError(err)
      }))
      .subscribe((response) => {
        this.router.navigate(['/main']).then(() => {});
      })
  }
}
