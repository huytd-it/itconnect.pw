import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "./polices.decorator";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requireRole = this.reflector.getAllAndOverride(ROLES_KEY,[
            context.getHandler(),
            context.getClass()
        ])
        if (!requireRole) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        return requireRole === user.role;
    }
}