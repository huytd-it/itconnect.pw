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
