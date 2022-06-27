import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({name: 'removeHtml'})
export class RemoveHtmlPipe implements PipeTransform {
  constructor() {
  }
  transform(value: string) {
    return value?.replace(/<[^>]*>/g, '');
  }
}
