import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mappingNameToParent'
})
export class MappingNameToParentPipe implements PipeTransform {

  constructor(
  ) {
  }

  transform(value: any[], ...args: unknown[]) {
    const k = args[0] as any;
    return value.map(item => ({
      ...item,
      name: item[k]['name']
    }))
  }

}
