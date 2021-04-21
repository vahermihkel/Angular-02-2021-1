import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SizeService } from './size.service';

@Component({
  selector: 'app-size-item',
  templateUrl: './size-item.component.html',
  styleUrls: ['./size-item.component.css']
})
export class SizeItemComponent implements OnInit {
  sizes: {id: string, sizeName: string}[] = [];
  size: string = "";

  constructor(private sizeService: SizeService) { }

  ngOnInit(): void {
    this.sizeService.getSizesFromDatabase().subscribe(sizesFromFb => {
      for (const key in sizesFromFb) {
          const element = sizesFromFb[key];
          this.sizes.push({id: key, sizeName: element.sizeName});
      }
    });
  }

  onAddSize() {
    if (this.size != "") {
      this.sizeService.addSizeToDatabase({sizeName: this.size}).subscribe();
      this.sizes.push({id: this.sizes.length.toString(), sizeName: this.size});
      this.size = "";
    }
  }

  // onSubmit(form: NgForm) {
  //   let size = form.value.size;
  //   this.sizeService.sizes.push(size);
  //   form.reset();
  // }

  onDeleteSize(i: number) {
    this.sizes.splice(i,1);
    this.sizeService.deleteFromDatabase(this.sizes).subscribe();
  }

}
