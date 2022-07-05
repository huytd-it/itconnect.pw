import {AppPermission} from "./permission.model";
import * as moment from "moment";

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

export const approveList = [
  {
    name: 'Tất cả',
    value: Approve.Both
  },
  {
    name: 'Công khai',
    value: Approve.True
  },
  {
    name: 'Riêng tư',
    value: Approve.False
  }
]

export class SearchPageOutput extends PageOutput {
  search?: string;
  approve?: Approve;
}

export class CreateTaggedOutput {
  name: string;
}

export class CreateOrEditTagOutput {
  id: number;
  name: string;
  isApprove: boolean;
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

export class AmchartLineConfig {
  name: string;
  field: string;
  stroke: string;
  fill?: string;
  strokeDasharray?: number[]
}

export enum EStatisticOptions {
  CurrentDay,
  Last7Day,
  Last14Day,
  All
}

export const StatisticOptions = [
  {
    name: 'Hôm nay',
    value: EStatisticOptions.CurrentDay
  },
  {
    name: '7 ngày qua',
    value: EStatisticOptions.Last7Day
  },
  {
    name: '14 ngày qua',
    value: EStatisticOptions.Last14Day
  },
  {
    name: 'Tất cả',
    value: EStatisticOptions.All
  }
]

export function getStatisticOptions(type: EStatisticOptions): StatisticOutput {
  const e = moment().toDate();
  let s: Date | undefined = undefined;
  let group: StatisticGroupBy | undefined = undefined;
  switch (type) {
    case EStatisticOptions.CurrentDay:
      s = moment().startOf('day').toDate();
      group = StatisticGroupBy.Hour
      break;

    case EStatisticOptions.Last7Day:
      s = moment().subtract(7, 'day').toDate();
      group = StatisticGroupBy.Day
      break;

    case EStatisticOptions.Last14Day:
      s = moment().subtract(14, 'day').toDate();
      group = StatisticGroupBy.Day
      break;

    case EStatisticOptions.All  :
      group = StatisticGroupBy.Day
      break;
  }

  return {
    start: s,
    end: e,
    group
  }
}

export function mergeStatistic(...data: { legend: string}[][]) {
  const hashing = data.map(d => d.reduce<{ [key: string]: any }>((val, item) => {
    val[item.legend] = item;
    return val;
  }, {}))

  data = data.sort((a, b) => b.length - a.length);

  return data[0].map((item, index) => {
    let result = item;
    hashing.forEach(it => {
      result = {
        ...result,
        ...it[item.legend]
      }
    })
    return result;
  })

}
