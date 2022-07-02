import { Pipe, PipeTransform } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AppPermission, AppRole} from "../../models/permission.model";
import {PermissionService} from "../../services/permission.service";
import {isArray} from "lodash";
import {FileService} from "../../services/file.service";

@Pipe({
  name: 'urlBySlug'
})
export class UrlBySlugPipe implements PipeTransform {

  constructor(
    private fileService: FileService
  ) {
  }

  transform(value: string | undefined, ...args: unknown[]) {
    if (!value) {
      return value;
    }
    return this.fileService.getFullUrl(value);
  }

}
