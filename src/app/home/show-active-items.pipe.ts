import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../models/item.model';

@Pipe({
  name: 'showActiveItems'
})
export class ShowActiveItemsPipe implements PipeTransform {

  transform(value: Item[], isLoggedIn: boolean): Item[] {
    if (isLoggedIn) {
      console.log(value);
      return value;
    }
    return value.filter(item => item.isActive == true);
  }

}
