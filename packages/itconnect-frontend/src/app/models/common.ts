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
  order?: 'ASC' | 'DESC';
  order_field?: string;
}


export enum Approve {
  Both = 1,
  False = 2,
  True = 3
}

export class SearchPageOutput extends PageOutput {
  search?: string;
  approve?: Approve;
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

export enum StatisticGroupBy {
  Hour = 1,
  Day = 2,
  Month = 3,
  Year = 4,
}

export class StatisticOutput {
  start?: Date;
  end?: Date;
  group?: StatisticGroupBy;
  jobId?: number;
}

