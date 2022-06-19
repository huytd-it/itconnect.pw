import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator";
import {Injectable} from "@nestjs/common";
import {Injector} from "@nestjs/core/injector/injector";
import {DataSource, Repository} from "typeorm";
import {
    NAME_API_PAGINATED_QUERY_ENTITY,
    NAME_API_PAGINATED_QUERY_FIELD
} from "../utils/decorators/api-paginated-query-order.decorator";
import { ModuleRef } from "@nestjs/core";
import {type} from "os";

const name = 'HasOrderField';

@ValidatorConstraint({ name, async: true })
@Injectable()
export class HasOrderFieldRule implements ValidatorConstraintInterface {
    constructor(
        private dataSource: DataSource
    ) {
    }

    async validate(value: string, args: ValidationArguments) {
        const entity = args.object[NAME_API_PAGINATED_QUERY_FIELD];
        if (!entity) {
            return true;
        }
        const columns = this.dataSource.entityMetadatas.find(item => item.target === entity).columns;
        const columnNames = columns.map(c => c.databaseName);
        return columnNames.includes(value);
    }

    defaultMessage(args: ValidationArguments) {
        return `Order field not exists`;
    }
}

export function HasOrderField<T>(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: name,
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: HasOrderFieldRule,
            constraints: []
        });
    };
}