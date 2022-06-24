import {AppPermission} from "./permission.model";

export interface MenuItem {
  name: string;
  class: string;
  link: string;
  permission: AppPermission;
  visible?: boolean;
}


export interface OptionItem<T = any> {
  id: number;
  name: string;
  data?: T;
}

export class BaseTable {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}


export class NotifyItem {
  type: 'success' | 'warning' | 'error';
  title: string;
  description: string;
}


export class PageInput<T> {
  data: T[];
  meta: {
    page: number,
    take: number,
    itemCount: number,
    pageCount: number
    hasPreviousPage: boolean,
    hasNextPage: boolean
  }
}


export class PageOutput {
  page?: number;
  take?: number;
  order?: 'asc' | 'desc';
  order_field?: string;
}

export class SearchPageOutput extends PageOutput {
  search?: string;
}

export class CreateTaggedOutput {
  name: string;
}

export class TaggedInput {
  id: number;
  name: string;
  isApprove: boolean;
  createdAt: Date;
  updatedAt: Date;
  deleteAt: Date;
}
