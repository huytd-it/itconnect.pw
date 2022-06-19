import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";
import {Reflector} from "@nestjs/core";
import {
    NAME_API_PAGINATED_QUERY_ENTITY,
    NAME_API_PAGINATED_QUERY_FIELD
} from "../decorators/api-paginated-query-order.decorator";

@Injectable()
export class PageGuard implements CanActivate {

    constructor(private reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const entity = this.reflector.get<string[]>(NAME_API_PAGINATED_QUERY_ENTITY, context.getHandler())
        if (entity) {
            context.switchToHttp().getRequest().query[NAME_API_PAGINATED_QUERY_FIELD] = entity;
        }
        return true
    }
}