import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckAuthService } from 'src/app/auth/check-auth.service';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';
import { CategoryService } from '../category/category.service';
import { SizeService } from '../size-item/size.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  sizes: string[] = [];
  itemSizes: string[] = [];
  categories: {categoryName: string}[] = [];

  constructor(private itemService: ItemService,
    private router: Router,
    private checkAuth: CheckAuthService,
    private sizeService: SizeService,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategoriesFromDatabase().subscribe(categoriesFromFb => {
      for (const key in categoriesFromFb) {
        const element = categoriesFromFb[key];
        this.categories.push({categoryName: element.categoryName});
    }
    });
    this.itemSizes = [];
    this.checkAuth.autologin();
    this.sizes = this.sizeService.sizes;
  }

  onSizeChanged(size: string, event: Event) {
    let isChecked = (<HTMLInputElement>event.target).checked;
    if(isChecked) {
      this.itemSizes.push(size);
    } else {
      let i = this.itemSizes.indexOf(size);
      this.itemSizes.splice(i,1);
    }
  }

  // itemSizes = []
  // vajutatakse "39"  -   itemSizes = ["39"]

  onSubmit(form: NgForm) {
    if (form.valid) {
      let formValue = form.value;
      let item = new Item(
        formValue.id,
        formValue.title, 
        formValue.price, 
        formValue.imgSrc,
        formValue.category,
        formValue.barcode,
        formValue.producer,
        formValue.description,
        true,
        this.itemSizes,
        0);
      // this.itemService.itemsInService.push(item);
      this.itemService.addItemToDatabase(item).subscribe(()=>
        this.router.navigateByUrl("/admin/items")
      );
      // setTimeout(()=>this.router.navigateByUrl("/admin/items"),200);
    } 
    // else {
    //   alert("VIGANE TOODE!");
    // }
  }

}
