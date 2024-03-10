import { Pipe, PipeTransform } from '@angular/core';
import { FilterFn } from '../interfaces/filter.interface';

@Pipe({
    name: 'filterByFn',
})
export class FilterByFnPipe implements PipeTransform {
    transform<T>(arr: T[] | null, filterFn: FilterFn): T[] {
        if (!arr) {
            return [];
        }

        return arr.filter(filterFn);
    }
}
