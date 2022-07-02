import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PermissionPipe} from "./pipes/permission.pipe";
import {NumberOnlyDirective} from "./directives/number-only.directive";
import {SafeHtmlPipe} from "./pipes/sanitizeHtml.pipe";
import {NumberDecimalOnlyDirective} from "./directives/number-decimal-only.directive";
import {DateFromNowPipe} from "./pipes/dateFromNow.pipe";
import {RemoveHtmlPipe} from "./pipes/removeHtml.pipe";
import {RolePipe} from "./pipes/role.pipe";
import {UrlBySlugPipe} from "./pipes/urlBySlug.pipe";
import {MappingNameToParentPipe} from "./pipes/mappingNameToParent.pipe";


@NgModule({
  declarations: [
    PermissionPipe,
    NumberOnlyDirective,
    SafeHtmlPipe,
    NumberDecimalOnlyDirective,
    DateFromNowPipe,
    RemoveHtmlPipe,
    RolePipe,
    UrlBySlugPipe,
    MappingNameToParentPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PermissionPipe,
    NumberOnlyDirective,
    SafeHtmlPipe,
    NumberDecimalOnlyDirective,
    DateFromNowPipe,
    RemoveHtmlPipe,
    RolePipe,
    UrlBySlugPipe,
    MappingNameToParentPipe
  ]
})
export class UtilsModule { }
