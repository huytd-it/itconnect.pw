import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AppService} from "../../../../../services/app.service";
import {finalize} from "rxjs";
import {CreateOrEditTagOutput, TaggedInput} from "../../../../../models/common";

export enum FormField {
  name = "name",
  isApprove = "isApprove",
}

@Component({
  selector: 'app-tag-form-modal',
  templateUrl: './tag-form-modal.component.html',
  styleUrls: ['./tag-form-modal.component.scss']
})
export class TagFormModalComponent implements OnInit {
  data: TaggedInput;
  form: FormGroup;

  readonly FormField = FormField;

  constructor(
    public dialogRef: MatDialogRef<TagFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public d: { data: TaggedInput, func: any },
    private formBuilder: FormBuilder,
    private appService: AppService,
  ) {
    this.data = d.data;
  }

  onClose() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      [FormField.name]: [
        this.data?.name,
        [
          Validators.minLength(1),
          Validators.maxLength(255),
          Validators.required
        ]
      ],
      [FormField.isApprove]: [this.data?.isApprove],
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
    const dto: CreateOrEditTagOutput = {
      id: this.data?.id || 0,
      name: data[FormField.name],
      isApprove: data[FormField.isApprove],
    }

    this.appService.setHeadLoading(true);
    this.d.func(dto)
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe((val: any) => {
        this.dialogRef.close(val);
      })
  }
}
