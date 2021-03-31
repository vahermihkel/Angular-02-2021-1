import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from 'src/app/cart/cart.service';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  item!: Item;

  // KÕIGEPEALT: saame numbri URLi seest kätte (ActivatedRoute constructorisse)
  // Selle abil saame õige eseme Servicest kätte (ItemService constuctorisse)
  // anname selle eseme väärtuse siia klassimuutujale
  // Klassimuutujast kuvame seda HTMLis

  constructor(private route: ActivatedRoute,
    private itemService: ItemService,
    private cartService: CartService,
    private cookieService: CookieService) { }

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('itemId'));
    this.item = this.itemService.itemsInService[id];
    // console.log(this.route.snapshot.paramMap);
    // console.log(id);
    // console.log(this.item);
  }

  // Numbrist stringiks: 12.toString()     123123.toLocaleString('fr')
  // Stringist numbriks:  Number("123")    (Number)("3123");

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
