import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PointConfigKL, PointConfigName, PointConfigType} from "../../../../../models/point-config.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PointJobUserService} from "../../../../../services/point-job-user.service";
import {AppService} from "../../../../../services/app.service";

@Component({
  selector: 'app-point-cf-item',
  templateUrl: './point-cf-item.component.html',
  styleUrls: ['./point-cf-item.component.scss']
})
export class PointCfItemComponent implements OnInit, OnChanges {
  @Input() type: PointConfigType;
  isWaiting: boolean;
  form: FormGroup;
  hide: boolean;

  get name() {
    return (<any>PointConfigName)[this.type]
  }

  constructor(
    private formBuilder: FormBuilder,
    private pointJobUserService: PointJobUserService,
    public appService: AppService
  ) {
    this.form = this.formBuilder.group({
      point: [null],
      pointExp: [null],
      pointExpVerified: [null],
    })
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const {type} = changes;
    if (type && type.currentValue && type.currentValue != type.previousValue) {
      setTimeout(() => {
        this.load()
      })
    }
  }

  private load() {
    const cf = (<any>PointConfigKL)[this.type];
    if (!cf) {
      this.hide = true;
      return
    }

    if (cf.p1) {
      this.form.controls['point'].enable();
    } else {
      this.form.controls['point'].disable();
    }
    if (cf.p2) {
      this.form.controls['pointExp'].enable();
    } else {
      this.form.controls['pointExp'].disable();
    }
    if (cf.p3) {
      this.form.controls['pointExpVerified'].enable();
    } else {
      this.form.controls['pointExpVerified'].disable();
    }
    this.isWaiting = true;
    this.pointJobUserService.getConfigOne(this.type)
      .subscribe(data => {
        this.isWaiting = false;
        if (!data) {
          return;
        }
        this.form.setValue({
          point: data.point,
          pointExp: data.pointExp,
          pointExpVerified: data.pointExpVerified,
        })
      })
  }

  save() {
    this.isWaiting = true;
    this.pointJobUserService.saveConfigOne({
      ...this.form.value,
      type: this.type
    }).subscribe(data => {
        this.isWaiting = false;
      })
  }
}
