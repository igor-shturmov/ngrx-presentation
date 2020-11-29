import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksListContainerComponent } from './containers/books-list-container/books-list-container.component';
import { TotalCountComponent } from './components/total-count/total-count.component';
import { BooksTotalCountContainerComponent } from './containers/books-total-count-container/books-total-count-container.component';
import { BooksReadingListContainerComponent } from './containers/books-reading-list-container/books-reading-list-container.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BooksReadingListComponent } from './components/books-reading-list/books-reading-list.component';
import { BooksService } from './services/books.service';
import { ReadingListService } from './services/reading-list.service';
import { EffectsModule } from '@ngrx/effects';
import { BooksListEffects } from './store/effects';
import { StoreModule } from '@ngrx/store';
import { BOOKS_FEATURE_KEY, booksReducer } from './store/reducers/books.reducer';
import { READING_LIST_FEATURE_KEY, readingListReducer } from './store/reducers/reading-list.reducer';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { BooksListRoutingModule } from './books-list-routing.module';
import { BooksListPageComponent } from './pages/books-list-page/books-list-page.component';
import { MatSidenavModule } from '@angular/material/sidenav';


@NgModule({
  declarations: [
    BooksListContainerComponent,
    TotalCountComponent,
    BooksTotalCountContainerComponent,
    BooksReadingListContainerComponent,
    BooksListComponent,
    BooksReadingListComponent,
    BooksListPageComponent],
  exports: [
    TotalCountComponent,
    BooksTotalCountContainerComponent,
    BooksListContainerComponent,
    BooksReadingListContainerComponent
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature(BooksListEffects),
    StoreModule.forFeature(BOOKS_FEATURE_KEY, booksReducer),
    StoreModule.forFeature(READING_LIST_FEATURE_KEY, readingListReducer),
    MatBadgeModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    BooksListRoutingModule,
    MatSidenavModule
  ],
  providers: [BooksService, ReadingListService]
})
export class BooksListModule {
}
