import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item.model';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Item[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.cartItems;
    console.log("Kasutaja läks cart component htmli peale");
    console.log(this.cartItems);
  }

  onDeleteFromCart(index: number) {
    console.log(index);
    console.log("kustutamisnupp töötab");
    this.cartService.cartItems.splice(index,1)
  }
}
