import { Module } from '@nestjs/common';
import {HasOrderFieldRule} from "./page-has-order-field.validate";
import {HasRowRule} from "./has-row-field.validate";

@Module({
    imports: [
    ],
    providers: [
        HasOrderFieldRule,
        HasRowRule
    ]
})
export class ValidatorsModule {
}
