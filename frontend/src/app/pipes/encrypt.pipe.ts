import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'encrypt',
})
export class EncryptPipe implements PipeTransform {
    transform(value: any): string {
        return '****************';
    }
}
