import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  BOOKS_FEATURE_KEY,
  booksAdapter,
  BooksPartialState,
  BooksState
} from '../reducers/books.reducer';

export const getBooksState = createFeatureSelector<BooksPartialState, BooksState>(BOOKS_FEATURE_KEY);

const { selectAll } = booksAdapter.getSelectors();

export const getBooksLoaded = createSelector(
  getBooksState,
  (state: BooksState) => state.loaded
);

export const getBooksError = createSelector(
  getBooksState,
  (state: BooksState) => state.error
);

export const getBooks = createSelector(getBooksState, selectAll);
