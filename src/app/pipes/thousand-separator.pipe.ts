import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandSeparator'
})
export class ThousandSeparatorPipe implements PipeTransform {

  transform(value: number): string {
    return value.toLocaleString('et', {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace(",",".")
    // return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

}
