import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator";
import {Injectable} from "@nestjs/common";
import {DataSource, Repository} from "typeorm";
import {EntityClassOrSchema} from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";

const name = 'HasRow';

@ValidatorConstraint({ name, async: true })
@Injectable()
export class HasRowRule implements ValidatorConstraintInterface {
    constructor(
        private dataSource: DataSource
    ) {
    }

    async validate(value: string, args: ValidationArguments) {
        const entity = args.constraints[0];
        const repo = this.dataSource.getRepository(entity);
        const field = args.constraints[1] || args.property;
        const rowCount = await repo.count({
            where: {
                [field]: value
            }
        })
        return rowCount < 1;
    }

    defaultMessage(args: ValidationArguments) {
        return `${args.constraints[1] || args.property} is exists`;
    }
}

export function HasRowField<T extends EntityClassOrSchema, K>(
    entity: T,
    field?: K,
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
                entity,
                field
            ]
        });
    };
}