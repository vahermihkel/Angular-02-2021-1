import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  sumOfCart = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartChanged.subscribe(items => {
        this.sumOfCart = 0;
        items.forEach(item => {
        // this.sumOfCart = this.sumOfCart + item.price;
        this.sumOfCart += item.price;
      });
    })
  }

}
