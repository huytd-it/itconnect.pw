import { Module } from '@nestjs/common';
import {HasOrderFieldRule} from "./page-has-order-field.validate";
import {ExistsRowRule} from "./exists-row-field.validate";
import {NotExistsRowRule} from "./not-exists-row-field.validate";

@Module({
    imports: [
    ],
    providers: [
        HasOrderFieldRule,
        ExistsRowRule,
        NotExistsRowRule,
    ]
})
export class ValidatorsModule {
}
