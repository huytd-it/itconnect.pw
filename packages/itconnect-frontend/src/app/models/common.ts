export interface MenuItem {
  name: string;
  class: string;
  link: string;
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
