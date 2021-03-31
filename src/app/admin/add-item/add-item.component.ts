import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckAuthService } from 'src/app/auth/check-auth.service';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  constructor(private itemService: ItemService,
    private router: Router,
    private checkAuth: CheckAuthService) { }

  ngOnInit(): void {
    this.checkAuth.autologin();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      let formValue = form.value;
      let item = new Item(
        formValue.title, 
        formValue.price, 
        formValue.imgSrc,
        formValue.category,
        formValue.barcode,
        formValue.producer,
        formValue.description);
      // this.itemService.itemsInService.push(item);
      this.itemService.addItemToDatabase(item);
      setTimeout(()=>this.router.navigateByUrl("/admin/items"),200);
    } 
    // else {
    //   alert("VIGANE TOODE!");
    // }
  }

}
