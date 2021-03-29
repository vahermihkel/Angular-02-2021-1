import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/auth.service';
import { CheckAuthService } from 'src/app/auth/check-auth.service';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  sumOfCart = 0;
  isLoggedIn = false;

  constructor(private cartService: CartService,
    private translate: TranslateService,
    private checkAuth: CheckAuthService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.checkAuth.autologin();
    this.checkAuth.loggedIn.subscribe(logged => {
      this.isLoggedIn = logged;
    });
    this.isLoggedIn = this.checkAuth.isLoggedIn();
    this.cartService.cartChanged.subscribe(items => {
        this.sumOfCart = 0;
        items.forEach(item => {
        // this.sumOfCart = this.sumOfCart + item.price;
        this.sumOfCart += item.cartItem.price * item.count;
      });
    })
    let lang = localStorage.getItem("language");
    // IFis saab vaadata true/false, aga ka kas on olemas või mitte
    if (lang) {
      this.useLanguage(lang);
    }
  }

  useLanguage(language: string): void {
    this.translate.use(language);
    localStorage.setItem("language", language);
  }

  onLogout() {
    this.authService.logout();
    this.checkAuth.loggedIn.next(false);
  }

}
