import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenTitle'
})
export class ShortenTitlePipe implements PipeTransform {

  transform(value: string, separateCount?: number): string {
    if (!separateCount) {
      separateCount = 3;
    }
    return value.split(' ').slice(0,separateCount).join(' ');
  }

}
