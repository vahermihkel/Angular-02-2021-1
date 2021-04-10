import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SizeService } from './size.service';

@Component({
  selector: 'app-size-item',
  templateUrl: './size-item.component.html',
  styleUrls: ['./size-item.component.css']
})
export class SizeItemComponent implements OnInit {
  sizes: string[] = [];
  size: string = "";

  constructor(private sizeService: SizeService) { }

  ngOnInit(): void {
    this.sizes = this.sizeService.sizes;
  }

  onAddSize() {
    this.sizeService.sizes.push(this.size);
    this.size = "";
  }

  // onSubmit(form: NgForm) {
  //   let size = form.value.size;
  //   this.sizeService.sizes.push(size);
  //   form.reset();
  // }

  onDeleteSize(i: number) {
    this.sizeService.sizes.splice(i,1);
  }

}
