import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'firstElementOfArray',
})
export class firstElementOfArray implements PipeTransform {
    transform<T>(arr: T[]): T | '' {
        return arr.at(0) ?? '';
    }
}
