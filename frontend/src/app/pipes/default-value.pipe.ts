import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'defaultValue',
})
export class DefaultValuePipe<T> implements PipeTransform {
    transform(value: T, defaultText = 'Brak'): T | string {
        const valueDoesntExist = value === null || value === undefined;
        const valueIsStringAndEmpty = typeof value === 'string' && value.length == 0;

        if (valueDoesntExist || valueIsStringAndEmpty) {
            return defaultText;
        }
        return value;
    }
}
