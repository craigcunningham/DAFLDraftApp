import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lastname'
})
export class LastnamePipe implements PipeTransform {

  transform(value: string): string {
    if (value !== null && value !== '') {
      const a: string[] = value.split(' ');
      const length: number = a.length;
      return a[length - 1];
      } else {
        return '';
      }
  }

}
