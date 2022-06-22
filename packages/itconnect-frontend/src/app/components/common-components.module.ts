import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'
import {MatInputModule} from "@angular/material/input";
import { LogoComponent } from './logo/logo.component';
import {RouterModule} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import { AvatarComponent } from './avatar/avatar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MainContentComponent} from "./main-content/main-content.component";
import { LineTextComponent } from './line-text/line-text.component';
import { FsLoadingComponent } from './fs-loading/fs-loading.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { NotifyComponent } from './notify/notify.component';
import {UtilsModule} from "../utils/utils.module";
import { EasySelectComponent } from './easy-select/easy-select.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import { EditorC1Component } from './editor-c1/editor-c1.component';
import {QuillModule} from "ngx-quill";
import { InputAmountVndComponent } from './input-amount-vnd/input-amount-vnd.component';
import {InputMonthYearComponent} from "./input-month-year/input-month-year.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

@NgModule({
  declarations: [
    LogoComponent,
    AvatarComponent,
    MainContentComponent,
    LineTextComponent,
    FsLoadingComponent,
    NotifyComponent,
    EasySelectComponent,
    EditorC1Component,
    InputAmountVndComponent,
    InputMonthYearComponent,
  ],
  imports: [
    CommonModule,
    UtilsModule,
    MatButtonModule,
    MatInputModule,
    RouterModule,
    MatCardModule,
    FontAwesomeModule,
    MatProgressBarModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    MatDatepickerModule,
    MatNativeDateModule
  ],
    exports: [
        MatButtonModule,
        MatInputModule,
        LogoComponent,
        AvatarComponent,
        FontAwesomeModule,
        MainContentComponent,
        LineTextComponent,
        FsLoadingComponent,
        NotifyComponent,
        UtilsModule,
        EasySelectComponent,
        EditorC1Component,
        InputAmountVndComponent,
        InputMonthYearComponent,
    ],
  providers: []
})
export class CommonComponentsModule { }
