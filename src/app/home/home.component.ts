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

  constructor(private cartService: CartService,
    private itemService: ItemService) { }

  ngOnInit(): void {
    this.items = this.itemService.itemsInService;
    console.log("Kasutaja läks home component htmli peale")
  }

  onAddToCart(cartItem: Item) {
    console.log(cartItem);
    this.cartService.cartItems.push(cartItem);
    console.log("Nupuvajutus töötab")
  }
}
