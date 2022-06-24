import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {SearchPageOutput} from "../../../../../../models/common";
import {AppService} from "../../../../../../services/app.service";
import {finalize} from "rxjs";
import {EasySelectComponent} from "../../../../../../components/easy-select/easy-select.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CreateOrEditCvCertificate, CvCertificate} from "../../../../../../models/cv-certificate.model";
import {CertificateService} from "../../../../../../services/certificate.service";
import {CvCertificateService} from "../../../../../../services/cv-certificate.service";

enum FormField {
  Certificate = 'certificate',
  Year = 'year',
  Content = 'content'
}

@Component({
  selector: 'app-work-experience-modal',
  templateUrl: './certificate-modal.component.html',
  styleUrls: ['./certificate-modal.component.scss']
})
export class CertificateModalComponent implements OnInit {
  @ViewChild('selectCertificate') selectCertificate: EasySelectComponent;
  form: FormGroup;
  readonly FormField = FormField;

  get maxDate() {
    return moment().toDate();
  }

  constructor(
    private certificateService: CertificateService,
    private cvCertificateService: CvCertificateService,
    private appService: AppService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CertificateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CvCertificate,
  ) {
    this.form = this.formBuilder.group({
      [FormField.Certificate]: [null, [Validators.required]],
      [FormField.Year]: [null, [Validators.required]],
      [FormField.Content]: [null],
    })
  }

  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue({
        [FormField.Certificate]: this.data.certificate,
        [FormField.Year]: moment().year(this.data.year),
        [FormField.Content]: this.data.content,
      })
    }
  }

  fetchCertificate = (query: SearchPageOutput) => {
    return this.certificateService.search(query);
  }

  onAddCertificate(e: string) {
    this.appService.setHeadLoading(true);
    this.certificateService.createTag({ name: e })
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe((data) => {
        this.form.controls[FormField.Certificate].setValue(data);
        this.selectCertificate.close();
      })
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

    const value = this.form.value;
    const data: CreateOrEditCvCertificate = {
      content: value[FormField.Content],
      year: moment(value[FormField.Year]).year(),
      certificate: value[FormField.Certificate]?.id,
    }

    if (this.data) {
      data.id = this.data.id;
    }

    this.appService.setHeadLoading(true);
    this.cvCertificateService.createOrEdit(data)
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.onClose(data);
      })
  }

  onClose(data?: CvCertificate) {
    this.dialogRef.close(data);
  }
}
