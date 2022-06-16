import {CanActivate, ExecutionContext, ForbiddenException, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";
import {PERMISSIONS_KEY, ROLES_KEY} from "./polices.decorator";
import {Reflector} from "@nestjs/core";
import {appPermissionKey2Name, appRolesConfig, appRolesConfigHashMap} from "./permission.enum";

@Injectable()
export class PermissionsGuard implements CanActivate {

    constructor(private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requirePermissions = this.reflector.getAllAndOverride(PERMISSIONS_KEY,[
            context.getHandler(),
            context.getClass()
        ])
        if (!requirePermissions) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();
        const permissionsHashMap = appRolesConfigHashMap[user.role];
        if (!permissionsHashMap) {
            return false;
        }

        let permissionCheck;
        const result = requirePermissions.some(p => {
            permissionCheck = p;
            return permissionsHashMap[p];
        })
        if (!result) {
            throw new ForbiddenException(`Require permission '${appPermissionKey2Name[permissionCheck]}'`);
        }

        return true;
    }
}