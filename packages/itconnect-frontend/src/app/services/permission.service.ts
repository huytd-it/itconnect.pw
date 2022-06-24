import { Injectable } from '@angular/core';
import {AppPermission, AppPermissionHashMap} from "../models/permission.model";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private permissionHashMap: AppPermissionHashMap = {};

  get all() {
    return AppPermission;
  }

  constructor() { }

  hasPermission(permission: AppPermission) {
    return this.permissionHashMap[permission] || false;
  }

  createPermissionHashMap(permissions: AppPermission[]) {
    this.permissionHashMap = permissions.reduce<AppPermissionHashMap>((val, item) => {
      val[item] = true;
      return val;
    }, {});
  }
}
