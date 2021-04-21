import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SizeService {
  sizes = [];

  url = "https://webshop-e151c-default-rtdb.europe-west1.firebasedatabase.app/";

  constructor(private http: HttpClient) { }

  // put asendab ära
  saveSizesToDatabase(): Observable<Object> {
    return this.http.put(this.url + "sizes.json", this.sizes);
  }

  // post lisab juurde
  addSizeToDatabase(sizeObject: {sizeName: string}): Observable<Object> {
    return this.http.post(this.url + "sizes.json", sizeObject);
  }

  // get saab kõik
  getSizesFromDatabase():Observable<{sizeName: string}[]> {
    return this.http.get<{sizeName: string}[]>(this.url + "sizes.json");
  }

  deleteFromDatabase(sizes: {id: string, sizeName: string}[]) {
    return this.http.put(this.url + "sizes.json", sizes)
  }
}
