import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
    // [
    //  {title: "PEALKIRI", price: 50, ...},
    //  {title: "PEALKIRI", price: 50, ...},
    //  {title: "MUU", price: 50, ...},
    //  Item
    //  ]

  // [
  // {cartItem: {title: "PEALKIRI", price: 50, ...}, count: 1}
  //]

  // [{cartItem: Item, count: 1},...]
  cartItems: {cartItem: Item, cartSize: string, count: number}[] = [];
  cartChanged = new Subject<{cartItem: Item, count: number}[]>();

  constructor() { }

}
