import { Pipe, PipeTransform } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AppPermission} from "../../models/permission.model";
import {PermissionService} from "../../services/permission.service";
import {isArray} from "lodash";

@Pipe({
  name: 'permission'
})
export class PermissionPipe implements PipeTransform {

  constructor(
    private permissionService: PermissionService
  ) {
  }

  transform(value: AppPermission | AppPermission[], ...args: unknown[]): boolean {
    if (isArray(value)) {
      return value.every(p => this.permissionService.hasPermission(p))
    }
    return this.permissionService.hasPermission(value);
  }

}
