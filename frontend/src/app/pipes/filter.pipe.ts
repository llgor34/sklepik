import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform<T>(arr: T[], filterValue: string): T[] {
    const filteredArr = arr.filter((el) =>
      JSON.stringify(el).includes(filterValue)
    );
    return filteredArr;
  }
}
