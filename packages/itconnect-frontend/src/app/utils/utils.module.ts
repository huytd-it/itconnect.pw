import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PermissionPipe} from "./pipes/permission.pipe";
import {NumberOnlyDirective} from "./directives/number-only.directive";


@NgModule({
  declarations: [
    PermissionPipe,
    NumberOnlyDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PermissionPipe,
    NumberOnlyDirective
  ]
})
export class UtilsModule { }
