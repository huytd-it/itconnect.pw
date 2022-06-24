import {EntityClassOrSchema} from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";
import {SetMetadata} from "@nestjs/common";

export const NAME_API_PAGINATED_QUERY_ENTITY = 'NAME_API_PAGINATED_QUERY_ENTITY';
export const NAME_API_PAGINATED_QUERY_FIELD = '__entityClass';

export const ApiPaginatedQueryOrder = (entity: EntityClassOrSchema) => SetMetadata(NAME_API_PAGINATED_QUERY_ENTITY, entity);