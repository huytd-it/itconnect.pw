import {AppPermission} from "./permission.model";
import * as moment from "moment";
import {values} from "lodash";

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

export const statisticGroupByList = [
  {
    name: 'Giờ',
    value: StatisticGroupBy.Hour
  },
  {
    name: 'Ngày',
    value: StatisticGroupBy.Day
  },
  {
    name: 'Tháng',
    value: StatisticGroupBy.Month
  },
  {
    name: 'Năm',
    value: StatisticGroupBy.Year
  },
]

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

export function mergeStatistic(type: StatisticGroupBy, ...data: { legend: string}[][]) {
  const hashing = data.map(d => d.reduce<{ [key: string]: any }>((val, item) => {
    val[item.legend] = item;
    return val;
  }, {}))

  const format = getFormatDateGroupByMoment(type);
  const hashingLegend = hashing.reduce<{ [key: string]: Date }>((val, item) => {
    Object.keys(item).forEach(legend => {
      if (!val[legend]) {
        val[legend] = moment(legend, format).toDate();
      }
    })
    return val
  }, {});

  const mapLegend = Object.keys(hashingLegend).map(legend => ({
    legend,
    date: hashingLegend[legend]
  })).sort((a, b) => <any>a.date - <any>b.date);

  const r = mapLegend.map((item, index) => {
    let result = item;
    hashing.forEach(it => {
      result = {
        ...result,
        ...it[item.legend]
      }
    })
    return result;
  })

  const keys = Object.keys(r.reduce<{ [key: string]: boolean }>((val, item) => {
    const ks = Object.keys(item);
    ks.forEach(k => val[k] = true);
    return val;
  }, {}));

  return r.map((item: any) => {
    keys.forEach(key => {
      item[key] = item[key] || 0;
    })
    return item;
  })
}

export function getFormatDateGroupByMoment(type: StatisticGroupBy) {
  switch (type) {
    case StatisticGroupBy.Hour: return 'HH[h] DD-MM-YYYY'
    case StatisticGroupBy.Day: return 'DD-MM-YYYY'
    case StatisticGroupBy.Month: return 'MM-YYYY'
    case StatisticGroupBy.Year: return 'YYYY'
  }
}

