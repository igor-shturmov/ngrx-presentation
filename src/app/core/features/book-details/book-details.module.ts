import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookDetailsRoutingModule } from './book-details-routing.module';
import { BookDetailsPageComponent } from './pages/book-details-page/book-details-page.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BookDetailsContainerComponent } from './containers/book-details-container/book-details-container.component';
import { BookDetailsService } from './services/book-details.service';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [BookDetailsPageComponent, BookDetailsComponent, BookDetailsContainerComponent],
  imports: [
    CommonModule,
    BookDetailsRoutingModule,
    MatButtonModule
  ],
  providers: [BookDetailsService]
})
export class BookDetailsModule { }
