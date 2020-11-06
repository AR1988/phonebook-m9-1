import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sortFilter'
})
export class SortFilterPipe implements PipeTransform {

  transform(value: any[], sort: string, isReverseSort: boolean): any[] {
    if (!value)
      return [];

    if (!sort)
      return value;

    if (isReverseSort)
      return value.sort((a, b) => a[sort] > b[sort] ? -1 : 1).reverse()
    else
      return value.sort((a, b) => a[sort] > b[sort] ? -1 : 1)
  }

}
