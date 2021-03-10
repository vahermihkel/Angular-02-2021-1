import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { Item } from '../models/item.model';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: Item[] = [];
  titleSortNumber = 0;
  priceSortNumber = 0;

  constructor(private cartService: CartService,
    private itemService: ItemService) { }

  ngOnInit(): void {
    this.items = this.itemService.itemsInService.slice();
  }

  onSortTitle() {
    // sort(saab esimese, teise eseme) =>
    // funktsiooni ning tagastab võrreldud esemed
    // ,1,10,1123,1231,1231,1,123,123
    if (this.titleSortNumber == 0) {
      this.items = this.items.sort((a, b) => 
      a.title.localeCompare(b.title)
      //ASCII
      );
      this.titleSortNumber = 1;
    } else if (this.titleSortNumber == 1) {
      this.items = this.items.sort((a, b) => 
      b.title.localeCompare(a.title)
      );
      this.titleSortNumber = 2;
    } else {
      this.items = this.itemService.itemsInService.slice();
      this.titleSortNumber = 0;
    }
    
  }

  onSortPrice() {
    if (this.priceSortNumber == 0) {
      this.items.sort((a, b) => a.price - b.price);
      this.priceSortNumber = 1;
    } else if (this.priceSortNumber == 1) {
      this.items.sort((a, b) => b.price - a.price);
      this.priceSortNumber = 2;
    } else {
      this.items = this.itemService.itemsInService.slice();
      this.priceSortNumber = 0;
    }
  }

  onAddToCart(cartItem: Item) {
    this.cartService.cartItems.push(cartItem);
    this.cartService.cartChanged.next(this.cartService.cartItems);
  }
}
