import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment";
import 'moment/locale/vi'

@Pipe({
  name: 'dateFromNow'
})
export class DateFromNowPipe implements PipeTransform {

  constructor(
  ) {
  }

  transform(value: Date, ...args: unknown[]): string {
    return moment(value).locale('vi').fromNow();
  }

}
