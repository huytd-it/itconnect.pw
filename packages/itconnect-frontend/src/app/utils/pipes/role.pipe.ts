import { Pipe, PipeTransform } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AppPermission, AppRole} from "../../models/permission.model";
import {PermissionService} from "../../services/permission.service";
import {isArray} from "lodash";

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  constructor(
    private authService: AuthService
  ) {
  }

  transform(value: AppRole | AppRole[], ...args: unknown[]): boolean {
    if (isArray(value)) {
      return value.every(p => this.authService.isRole(p))
    }
    return this.authService.isRole(value);
  }

}
