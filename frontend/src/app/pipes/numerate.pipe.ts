import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'numerate',
})
export class NumeratePipe implements PipeTransform {
    transform<T>(arr: T[]) {
        return arr.map((value, idx) => ({ idx: idx + 1, value }));
    }
}
