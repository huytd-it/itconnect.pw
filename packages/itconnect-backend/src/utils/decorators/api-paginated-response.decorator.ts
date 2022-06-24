import { applyDecorators, Type } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { PageDto } from "src/dtos/page.dto";

export const ApiPaginatedResponse = <TModel extends Type<any>>(
    model: TModel
) => {
    return applyDecorators(
        ApiExtraModels(PageDto),
        ApiExtraModels(model),
        ApiOkResponse({
            schema: {
                allOf: [
                    { $ref: getSchemaPath(PageDto) },
                    {
                        properties: {
                            data: {
                                type: "array",
                                items: { $ref: getSchemaPath(model) },
                            },
                        },
                    },
                ],
            },
        })
    );
};