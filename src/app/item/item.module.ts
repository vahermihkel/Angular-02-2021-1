import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortenTitlePipe } from '../pipes/shorten-title.pipe';
import { ThousandSeparatorPipe } from '../pipes/thousand-separator.pipe';
import { ItemCardComponent } from './item-card/item-card.component';
import { ViewComponent } from './view/view.component';
import { AppRoutingModule } from '../app-routing.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    ItemCardComponent,
    ViewComponent,
    ThousandSeparatorPipe,
    ShortenTitlePipe,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    TranslateModule
  ],
  exports: [
    ItemCardComponent,
    ThousandSeparatorPipe
  ]
})
export class ItemModule { }
