import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories:{categoryName: string}[] = 
    [
      // {categoryName: "shoes"},
      // {categoryName: "sneakers"},
      // {categoryName: "sandals"},
      // {categoryName: "flip flops"},
      // {categoryName: "boots"},
      // {categoryName: "rainboots"},
    ]


    url = "https://webshop-e151c-default-rtdb.europe-west1.firebasedatabase.app/";

    constructor(private http: HttpClient) { }
  
    // put asendab ära
    saveCategoriesToDatabase(): Observable<Object> {
      return this.http.put(this.url + "categories.json", this.categories);
    }
  
    // post lisab juurde
    addCategoryToDatabase(categoryObject: {categoryName: string}): Observable<Object> {
      return this.http.post(this.url + "categories.json", categoryObject);
    }
  
    // get saab kõik
    getCategoriesFromDatabase():Observable<{categoryName: string}[]> {
      return this.http.get<{categoryName: string}[]>(this.url + "categories.json");
    }
  
    deleteFromDatabase(categories: {id: string, categoryName: string}[]) {
      return this.http.put(this.url + "categories.json", categories)
    }
}
