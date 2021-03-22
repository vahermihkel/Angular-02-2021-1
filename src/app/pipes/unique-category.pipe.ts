import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../models/item.model';

@Pipe({
  name: 'uniqueCategory'
})
export class UniqueCategoryPipe implements PipeTransform {

  transform(value: Item[]): string[] {
  // [{title: "PEALKIRI", price: 49, category: "shoes"},{title: "PEALKIRI", price: 50, ...},{title: "MUU", price: 50, ...}]
  // ["shoes","shoes","beer","shoes", "beer", "car"]

  // .indexOf("shoes") - 0
  // .indexOf("shoes") - 0
  // .indexOf("beer") - 2
  // .indexOf("shoes") - 0
  // .indexOf("car") - 5
  // 0,1,2,3,4,5.....       0 ==0 , 1!=0 , 2==2  , 3 != 0  ,  4 != 2   ,  5==5

  // value = muutuv väärtus    index - järjekorranumber                array
  // "shoes"                          0                           ["s","s","b","s",.....]
  // "shoes"                          1                           ["s","s","b","s",.....]
  // "beer"                          2                           ["s","s","b","s",.....]
    return value.map(item => item.category).
        filter((value, index, array)=>
          array.indexOf(value) == index);
  }

}
