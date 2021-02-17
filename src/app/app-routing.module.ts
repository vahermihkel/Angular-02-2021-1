import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';

// kandilised sulud on massiivide (listide) jaoks
// listid koosnevad elementidest, mis on komaga eraldatud
// elementide arv = komad + 1

// objektid on loogeliste sulgudega, koosnevad võti-väärtus paaridest
// võti-väärtus paarid on komaga eraldatud
// kuju: VÕTI KOOLON VÄÄRTUS {võti: väärtus1, võti: väärtus2, võti: väärtus3}
const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "cart", component: CartComponent},
  { path: "**", redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
