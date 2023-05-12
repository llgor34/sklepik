import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lastElementOfArray',
})
export class lastElementOfArray implements PipeTransform {
  transform<T>(arr: T[]): T | '' {
    return arr.at(-1) ?? '';
  }
}
