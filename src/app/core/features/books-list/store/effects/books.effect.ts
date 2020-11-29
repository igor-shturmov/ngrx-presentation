import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as BooksActions from '../actions/books.action';
import { BooksService } from '../../services/books.service';

@Injectable()
export class BooksEffect {
  constructor(private readonly actions$: Actions,
              private readonly booksService: BooksService) {
  }

  searchBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.searchBooks),
      switchMap(({ payload }) =>
        this.booksService.search(payload).pipe(
          map((data) => BooksActions.searchBooksSuccess(data)),
          catchError((error) => of(BooksActions.searchBooksFailure(error)))
        )
      )
    )
  );
}
