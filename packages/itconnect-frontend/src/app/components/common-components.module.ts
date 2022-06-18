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

@NgModule({
  declarations: [
    LogoComponent,
    AvatarComponent,
    MainContentComponent,
    LineTextComponent,
    FsLoadingComponent,
    NotifyComponent,
    EasySelectComponent,
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
    ReactiveFormsModule
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
  ],
  providers: []
})
export class CommonComponentsModule { }
