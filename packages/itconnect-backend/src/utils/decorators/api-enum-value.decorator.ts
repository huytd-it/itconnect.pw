import {applyDecorators} from "@nestjs/common";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export const ApiEnumValue = (
    decorator: (typeof ApiProperty | typeof ApiPropertyOptional),
    ...options: Parameters<typeof decorator>
) => {
    const [option, ...params] = options;
    const en = option.enum;
    const enKeys = Object.keys(en).filter(item => !Number(item));
    const enValues = enKeys.map(key => en[key]);
    const description = enKeys.map(key => `${en[key]}: ${key}`).join((', '));

    return decorator({
        ...option,
        description: description,
        enum: enValues,
    }, ...params);
}