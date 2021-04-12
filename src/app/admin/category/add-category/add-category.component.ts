import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  newCategory!: string;

  constructor(private categoryService: CategoryService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // this.categoryService.categories.push(
    //   {categoryName: this.newCategory}
    // );
    this.categoryService.addCategoryToDatabase({categoryName: this.newCategory}).subscribe(
      () => this.router.navigateByUrl('/admin/categories')
    )
  }

}
