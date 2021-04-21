import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CheckAuthService } from '../auth/check-auth.service';
import { Item } from '../models/item.model';
import { UniqueCategoryPipe } from '../pipes/unique-category.pipe';
import { ItemService } from '../services/item.service';
import { ShowActiveItemsPipe } from './show-active-items.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  itemsOriginal: Item[] = [];
  itemsShown: Item[] = [];
  titleSortNumber = 0;
  priceSortNumber = 0;
  itemCategories: {category: string, isSelected: boolean}[] = [];
  isLoading = false;
  isLoggedIn = false;
  cartItems: { cartItem: Item, count: number}[] = [];

  constructor(private itemService: ItemService,
    private uniqueCategoryPipe: UniqueCategoryPipe,
    private checkAuth: CheckAuthService,
    private showActiveItemsPipe: ShowActiveItemsPipe,
    private cookieService: CookieService) { }

  ngOnInit(): void {
    this.checkAuth.autologin();
    
    this.checkAuth.loggedIn.subscribe(logged => {
      this.isLoggedIn = logged;
      this.itemsShown = this.showActiveItemsPipe.transform(this.itemsShown, this.isLoggedIn);
    });

    this.isLoggedIn = this.checkAuth.isLoggedIn();
    this.isLoading = true;
    this.itemService.getItemsFromDatabase().subscribe(itemsFromFirebase => {
      this.itemsOriginal = [];
      this.itemService.itemsInService = [];
      for (const key in itemsFromFirebase) {
          const element = itemsFromFirebase[key];
          this.itemsOriginal.push(element);
          this.itemService.itemsInService.push(element);
      }
     
      if (this.cookieService.get("categories") != "") {
        let itemCategories = JSON.parse(this.cookieService.get("categories"));
        this.itemCategories = this.uniqueCategoryPipe.transform(this.itemsOriginal).map((itemCategory,i) => {
          return {category: itemCategory, isSelected: 
            (itemCategories[i] && itemCategory==itemCategories[i].category)  ? itemCategories[i].isSelected : true}
        });
      } else {
        this.itemCategories = this.uniqueCategoryPipe.transform(this.itemsOriginal).map(itemCategory => {
          return {category: itemCategory, isSelected: true}
        });
      }
      this.isLoading = false;

      let cookieValue = this.cookieService.get('cart');
      if (cookieValue) {
        this.cartItems = JSON.parse(cookieValue) ?? [];
      }

        // map    Item   ---> cartItem: Item, {count: 3}    // {"item":{"barcode":"12345672","category":"tools","imgSrc":"https://i.ebayimg.com/thumbs/images/g/j0kAAOSwOJVetTCG/s-l225.webp","isActive":true,"price":8.19,"title":"45in1 Screwdriver Bit Set Multifunctional Computer Mobile Phone Repair Tool Kit"},"count":3}
      this.itemsOriginal = this.itemsOriginal.map(obj => {
          const index = this.cartItems.findIndex(el => el.cartItem.id == obj.id);
          const { count } = index !== -1 ? this.cartItems[index] : { count: 0 };
          return {
            ...obj,
            count
          };
      })
      console.log(this.itemsOriginal);
      this.itemsShown = this.showActiveItemsPipe.transform(this.itemsOriginal.slice(), this.isLoggedIn);
      this.onSelectCategory(-2);

    })
  }

  onSelectCategory(index: number) {
    if (index != -2) {
      this.itemCategories[index].isSelected = !this.itemCategories[index].isSelected;
    } 
    this.itemsShown = this.itemsOriginal.filter(item=>{
      let category = this.itemCategories.find(itemCategory => {
          return item.category == itemCategory.category;
      })
      if (category?.isSelected == true) {
        return item;
      } else {
        return null;
      }
    })
    this.cookieService.set('categories',JSON.stringify(this.itemCategories));
    this.itemsShown = this.showActiveItemsPipe.transform(this.itemsShown, this.isLoggedIn);
    // this.itemsShown = this.itemsOriginal
  }
  

  onSortTitle() {
    // sort(saab esimese, teise eseme) =>
    // funktsiooni ning tagastab võrreldud esemed
    // ,1,10,1123,1231,1231,1,123,123
    if (this.titleSortNumber == 0) {
      this.itemsShown = this.itemsShown.sort((a, b) => 
      a.title.localeCompare(b.title)
      //ASCII
      );
      this.titleSortNumber = 1;
    } else if (this.titleSortNumber == 1) {
      this.itemsShown = this.itemsShown.sort((a, b) => 
      b.title.localeCompare(a.title)
      );
      this.titleSortNumber = 2;
    } else {
      this.itemsShown = this.itemService.itemsInService.slice();
      this.onSelectCategory(-2);
      this.titleSortNumber = 0;
    }
    this.itemsShown = this.showActiveItemsPipe.transform(this.itemsShown, this.isLoggedIn);
  }

  onSortPrice() {
    if (this.priceSortNumber == 0) {
      this.itemsShown.sort((a, b) => a.price - b.price);
      this.priceSortNumber = 1;
    } else if (this.priceSortNumber == 1) {
      this.itemsShown.sort((a, b) => b.price - a.price);
      this.priceSortNumber = 2;
    } else {
      this.itemsShown = this.itemService.itemsInService.slice();
      this.onSelectCategory(-2);
      this.priceSortNumber = 0;
    }
    this.itemsShown = this.showActiveItemsPipe.transform(this.itemsShown, this.isLoggedIn);
  }

  
  itemActiveChange(item: Item) {
    let i = this.itemsOriginal.findIndex(itemOrig => item.title == itemOrig.title);
    this.itemsOriginal[i] = item; // lehel näitamise jaoks
    this.itemService.itemsInService[i] = item; // andmebaasi sisestamise jaoks
    this.itemService.saveItemsToDatabase().subscribe();
  }
  
}
