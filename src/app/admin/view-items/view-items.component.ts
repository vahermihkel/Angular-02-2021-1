import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.css']
})
export class ViewItemsComponent implements OnInit {
  items: Item[] = [];

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    // this.items = this.itemService.itemsInService;
    this.itemService.getItemsFromDatabase().subscribe(items => {
      console.log("OLEN VÕTMAS UUSI ESEMEID");
      this.items = [];
      this.itemService.itemsInService = [];
      for (const key in items) {
          const element = items[key];
          this.items.push(element);
          this.itemService.itemsInService.push(element);
      }
      // this.itemService.itemsInService = items;
    })
    console.log("TÖÖTLEN NEID ESEMEID");
  }

  onDeleteItem(i: number) {
    this.itemService.itemsInService.splice(i,1);
    this.items.splice(i,1);
    this.itemService.saveItemsToDatabase();
  }

}
