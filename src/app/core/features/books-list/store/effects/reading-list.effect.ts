import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map, mapTo } from 'rxjs/operators';
import * as ReadingListActions from '../actions/reading-list.action';
import { TypedAction } from '@ngrx/store/src/models';
import { ReadingListService } from '../../services/reading-list.service';

@Injectable()
export class ReadingListEffect implements OnInitEffects {
  constructor(private actions$: Actions, private readingListService: ReadingListService) {
  }

  loadReadingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.init),
      exhaustMap(() =>
        this.readingListService.getList()
          .pipe(
            map((data) => ReadingListActions.loadReadingListSuccess(data)),
            catchError((error) => of(ReadingListActions.loadReadingListError(error)))
          )
      )
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.addToReadingList),
      concatMap(({ payload }) =>
        this.readingListService.addBook(payload)
          .pipe(
            mapTo(ReadingListActions.confirmedAddToReadingList(payload)),
            catchError(() => of(ReadingListActions.failedAddToReadingList(payload)))
          )
      )
    )
  );

  removeBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.removeFromReadingList),
      concatMap(({ payload }) =>
        this.readingListService.removeBook(payload.bookId)
          .pipe(
            mapTo(ReadingListActions.confirmedRemoveFromReadingList(payload)),
            catchError(() => of(ReadingListActions.failedRemoveFromReadingList(payload)))
          )
      )
    )
  );

  ngrxOnInitEffects(): TypedAction<any> {
    return ReadingListActions.init();
  }
}
