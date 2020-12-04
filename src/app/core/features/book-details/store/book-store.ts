import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { BookState } from '../interfaces/book-state';
import { Book, ReadingListItem } from '../../books-list/interfaces/book';
import { BookDetailsService } from '../services/book-details.service';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class BookStore extends ComponentStore<BookState> {

  constructor(private bookService: BookDetailsService) {
    super({ book: null });
  }

  readonly setBook = this.updater((state: BookState, book: Book) => ({
    ...state,
    book,
  }));

  readonly setReadingList = this.updater((state: BookState, inReadingList: boolean) => ({
    ...state,
    book: { ...state.book, isAdded: inReadingList }
  }));

  readonly getBook = this.effect((bookId$: Observable<string>) => {
    return bookId$.pipe(
      switchMap((id) => this.bookService.getBook(id)
        .pipe(
          withLatestFrom(this.bookService.getList()),
          map(([b, list]: [Book, Array<ReadingListItem>]) => ({
            ...b,
            isAdded: b && !!list.find(({ bookId }: ReadingListItem) => bookId === b.id)
          })),
          tap({
            next: (book) => this.setBook(book),
            error: (e) => this.logError(e),
          }),
          catchError((e) => of(this.logError(e))),
        )),
    );
  });

  readonly addBookToReadingList = this.effect((book$: Observable<Book>) => {
    return book$.pipe(
      switchMap((b: Book) => this.bookService.addBook(b)
        .pipe(
          tap(() => this.setReadingList(true)),
          catchError((err) => of(this.logError(err))),
        )
      )
    );
  });

  readonly removeBookFromReadingList = this.effect((bookId$: Observable<string>) => {
    return bookId$.pipe(
      switchMap((id: string) => this.bookService.removeBook(id)
        .pipe(
          tap(() => this.setReadingList(false)),
          catchError(() => EMPTY),
        )
      )
    );
  });

  readonly logError = (e) => console.log(e);

  selectBook(): Observable<Book> {
    return this.select((state) => state.book);
  }
}
