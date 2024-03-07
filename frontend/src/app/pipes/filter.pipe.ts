import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
})
export class FilterPipe implements PipeTransform {
    transform<T>(arr: T[] | null, filterValue: string | null): T[] | null {
        if (!arr || !filterValue) {
            return arr;
        }
        const filteredArr = arr.filter((el) => JSON.stringify(el).toLowerCase().includes(filterValue.toLowerCase()));
        return filteredArr;
    }
}
