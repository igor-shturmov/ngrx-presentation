import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { BookState } from '../interfaces/book-state';
import { Book } from '../../books-list/interfaces/book';
import { BookDetailsService } from '../services/book-details.service';
import { EMPTY, Observable } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class BookStore extends ComponentStore<BookState> {

  constructor(private bookService: BookDetailsService) {
    super({ book: null });
  }

  readonly setBook = this.updater((state, book: Book) => ({
    book,
  }));

  readonly getBook = this.effect((bookId$: Observable<string>) => {
    return bookId$.pipe(
      switchMap((id) => this.bookService.getBook(id).pipe(
        tap({
          next: (movie) => this.setBook(movie),
          error: (e) => this.logError(e),
        }),
        catchError(() => EMPTY),
      )),
    );
  });

  readonly logError = (e) => console.log(e);

  selectBook(): Observable<Book> {
    return this.select((state) => state.book);
  }
}
