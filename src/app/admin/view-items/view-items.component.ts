import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.css']
})
export class ViewItemsComponent implements OnInit {
  items: Item[] = [];

  constructor(private itemService: ItemService,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.itemService.getItemsFromDatabase().subscribe(items => {
      this.items = [];
      this.itemService.itemsInService = [];
      for (const key in items) {
          const element = items[key];
          this.items.push(element);
          this.itemService.itemsInService.push(element);
      }
    })
  }

  onDeleteItem(id: number) {
    let isConfirm = confirm(this.translate.instant("Kas kustutad?"));
    if (isConfirm) {
      let i = this.itemService.itemsInService.findIndex(item=>item.id==id);
      if (i) {
        this.itemService.itemsInService.splice(i,1);
        this.items.splice(i,1);
        this.itemService.saveItemsToDatabase().subscribe();
      }
    }
  }

}
