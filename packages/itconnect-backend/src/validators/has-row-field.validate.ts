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
import {EntityClassOrSchema} from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";

const name = 'HasRow';

interface HasRowOption<T extends  EntityClassOrSchema> {
    entity: T,
    field?: keyof T
}

@ValidatorConstraint({ name, async: true })
@Injectable()
export class HasRowRule implements ValidatorConstraintInterface {
    constructor(
        private dataSource: DataSource
    ) {
    }

    async validate(value: string, args: ValidationArguments) {
        const options: HasRowOption<any> = args.constraints[0];
        const repo = this.dataSource.getRepository(options.entity);
        const field = args.constraints[0].field || args.property;
        const rowCount = await repo.count({
            where: {
                [field]: value
            }
        })
        return rowCount < 1;
    }

    defaultMessage(args: ValidationArguments) {
        return `${args.constraints[0].field || args.property} is exists`;
    }
}

export function HasRowField<T extends EntityClassOrSchema>(
    options: HasRowOption<T>,
    validationOptions?: ValidationOptions
) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: name,
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: HasRowRule,
            constraints: [
                options
            ]
        });
    };
}