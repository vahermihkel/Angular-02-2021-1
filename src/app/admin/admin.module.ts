import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddItemComponent } from './add-item/add-item.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { ViewItemsComponent } from './view-items/view-items.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemModule } from '../item/item.module';
import { SizeItemComponent } from './size-item/size-item.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { ViewCategoriesComponent } from './category/view-categories/view-categories.component';


@NgModule({
  declarations: [
    AddItemComponent,
    EditItemComponent,
    ViewItemsComponent,
    AdminHomeComponent,
    SizeItemComponent,
    AddCategoryComponent,
    ViewCategoriesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    AppRoutingModule,
    ItemModule
  ]
})
export class AdminModule { }
