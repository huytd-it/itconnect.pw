import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PermissionPipe} from "./pipes/permission.pipe";
import {NumberOnlyDirective} from "./directives/number-only.directive";
import {SafeHtmlPipe} from "./pipes/sanitizeHtml.pipe";


@NgModule({
  declarations: [
    PermissionPipe,
    NumberOnlyDirective,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PermissionPipe,
    NumberOnlyDirective,
    SafeHtmlPipe
  ]
})
export class UtilsModule { }
