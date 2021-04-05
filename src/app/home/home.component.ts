import { Component, OnInit } from '@angular/core';
import { CheckAuthService } from '../auth/check-auth.service';
import { Item } from '../models/item.model';
import { UniqueCategoryPipe } from '../pipes/unique-category.pipe';
import { ItemService } from '../services/item.service';

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
  itemCategories!: {category: string, isSelected: boolean}[];
  isLoading = false;
  isLoggedIn = false;
  // kuupaev = new Date();

  constructor(private itemService: ItemService,
    private uniqueCategoryPipe: UniqueCategoryPipe,
    private checkAuth: CheckAuthService) { }

  ngOnInit(): void {
    this.checkAuth.autologin();
    this.checkAuth.loggedIn.subscribe(logged => {
      this.isLoggedIn = logged;
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
      this.itemsShown = this.itemsOriginal.slice();
  //    [{title: "PEALKIRI", price: 49, category: "shoes"},{title: "PEALKIRI", price: 50, ...},{title: "MUU", price: 50, ...}]
  // ["shoes","beer", "car"]
  // [{category: "shoes", isSelected: true},{category: "beer", isSelected: true}, "car"]
      this.itemCategories = this.uniqueCategoryPipe.transform(this.itemsOriginal).map(itemCategory => {
        return {category: itemCategory, isSelected: true}
      });
      this.isLoading = false;
    })
  }

  onSelectCategory(index: number) {
    this.itemCategories[index].isSelected = !this.itemCategories[index].isSelected;
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
      this.titleSortNumber = 0;
    }
    
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
      this.priceSortNumber = 0;
    }
  }

  
  itemActiveChange(item: Item) {
    let i = this.itemsOriginal.findIndex(itemOrig => item.title == itemOrig.title);
    this.itemsOriginal[i] = item; // lehel näitamise jaoks
    this.itemService.itemsInService[i] = item; // andmebaasi sisestamise jaoks
    this.itemService.saveItemsToDatabase().subscribe();
  }
  
}
