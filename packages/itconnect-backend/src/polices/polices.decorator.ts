import {SetMetadata} from "@nestjs/common";
import {AppPermission, AppRole} from "./permission.enum";

export const ROLES_KEY = 'roles';
export const Role = (role: AppRole) => SetMetadata(ROLES_KEY, role);

export const PERMISSIONS_KEY = 'permissions';
export const RequirePermissions = (...permissions: AppPermission[]) => SetMetadata(PERMISSIONS_KEY, permissions);