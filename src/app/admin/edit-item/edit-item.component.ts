import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  item!: Item;
  itemEditForm!: FormGroup;
  itemId!: number;

  constructor(private route: ActivatedRoute,
    private itemService: ItemService,
    private router: Router) { }

  ngOnInit(): void {
    this.itemId = (Number)(this.route.snapshot.paramMap.get("itemId"));
    this.item = this.itemService.itemsInService[this.itemId];
    this.itemEditForm = new FormGroup({
      title: new FormControl(this.item.title),
      price: new FormControl(this.item.price),
      imgSrc: new FormControl(this.item.imgSrc),
      category: new FormControl(this.item.category),
      barcode: new FormControl(this.item.barcode),
      producer: new FormControl(this.item.producer),
      description: new FormControl(this.item.description),
    });
  }


  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.itemService.itemsInService[this.itemId] = new Item(
          form.value.title, 
          form.value.price, 
          form.value.imgSrc,
          form.value.category,
          form.value.barcode,
          form.value.producer,
          form.value.description);
      this.itemService.saveItemsToDatabase();
      setTimeout(()=>this.router.navigateByUrl("/admin/items"),200);
    } 
    // else {
    //   alert("VIGANE TOODE!");
    // }
  }

  
}
