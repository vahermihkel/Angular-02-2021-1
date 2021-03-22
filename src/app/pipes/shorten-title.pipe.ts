import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenTitle'
})
export class ShortenTitlePipe implements PipeTransform {

  transform(value: string, separateCount?: number): string {
    if (!separateCount) {
      separateCount = 3;
    }
    return value.split(' ').slice(0,separateCount).join(' '); // JS arrays
    // Salomon --> ["S", "lomon"]
    // Tere tere tallekesed head aega --> ["Tere", "tere", "tallekesed", "head", "aega"]
    // slice(0,3)   ["Tere", "tere", "tallekesed"]
  }

}
