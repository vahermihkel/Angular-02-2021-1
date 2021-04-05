import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model'; // ABS path - alates algusest
import { CookieService } from 'ngx-cookie-service';
import { CartService } from '../../cart/cart.service'; // REL path - sellest kohast

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
  @Input() item!: Item;
  @Input() i!: number;

  constructor(private cartService: CartService,
    private cookieService: CookieService) { }

  ngOnInit(): void {
  }

  onRemoveFromCart(item: Item) {
    // {title: "PEALKIRI", price: 50, ...}
    // [{title: "PEALKIRI", price: 49, ...},{title: "PEALKIRI", price: 50, ...},{title: "MUU", price: 50, ...}]
    let i = this.cartService.cartItems.findIndex(cartItem => item.title == cartItem.cartItem.title)
    if (i != -1) {
      if (this.cartService.cartItems[i].count == 1) {
        this.cartService.cartItems.splice(i,1);
      } else {
        this.cartService.cartItems[i].count -= 1;
      }
      this.cartService.cartChanged.next(this.cartService.cartItems);
      this.cookieService.set( 'cart', JSON.stringify(this.cartService.cartItems) );      
    }   
  }

  onAddToCart(item: Item) {
    let i = this.cartService.cartItems.findIndex(cartItem => item.title == cartItem.cartItem.title)
    if (i != -1) {
      this.cartService.cartItems[i].count += 1;
    } else {
      this.cartService.cartItems.push({cartItem: item, count: 1});
    }
    this.cartService.cartChanged.next(this.cartService.cartItems);
    this.cookieService.set( 'cart', JSON.stringify(this.cartService.cartItems) );
  }

}
