import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SizeService {
  sizes = ["37", "38", "39", "40", "41", "42", "43"];

  constructor() { }
}
