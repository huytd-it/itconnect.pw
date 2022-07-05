import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AppService} from "../../../../../services/app.service";
import {finalize} from "rxjs";
import {CreateOrEditTagOutput, TaggedInput} from "../../../../../models/common";

export enum FormField {
  name = "name",
}

@Component({
  selector: 'app-tag-form-modal',
  templateUrl: './tag-form-modal-2.component.html',
  styleUrls: ['./tag-form-modal-2.component.scss']
})
export class TagFormModal2Component implements OnInit {
  data: TaggedInput;
  form: FormGroup;

  readonly FormField = FormField;

  constructor(
    public dialogRef: MatDialogRef<TagFormModal2Component>,
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
    const dto: CreateOrEditTagOutput = <any>{
      id: this.data?.id || 0,
      name: data[FormField.name],
    }

    this.appService.setHeadLoading(true);
    this.d.func(dto)
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe((val: any) => {
        if (val.id) {
          this.dialogRef.close(val);
        } else {
          this.dialogRef.close({
            ...this.data,
            ...dto
          });
        }
      })
  }
}
