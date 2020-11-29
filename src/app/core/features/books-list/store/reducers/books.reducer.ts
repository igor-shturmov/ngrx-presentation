import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as BooksActions from '../actions/books.action';
import { Book } from '../../interfaces/book';

export const BOOKS_FEATURE_KEY = 'books';

export interface BooksState extends EntityState<Book> {
  loaded: boolean;
  error?: string | null;
  searchTerm?: string;
}

export interface BooksPartialState {
  readonly [BOOKS_FEATURE_KEY]: BooksState;
}

export const booksAdapter: EntityAdapter<Book> = createEntityAdapter<Book>();

export const initialState: BooksState = booksAdapter.getInitialState({ loaded: false });

const searchBooksHandler = (state: BooksState, { payload }): BooksState => ({
  ...state,
  searchTerm: payload,
  loaded: false,
  error: null
});

const searchBooksSuccessHandler = (state: BooksState, { payload }): BooksState =>
  booksAdapter.setAll(payload, {
    ...state,
    loaded: true
  });

const searchBooksErrorHandler = (state: BooksState, { payload }): BooksState => ({
  ...state,
  error: payload
});

const clearStateHandler = (state: BooksState): BooksState => booksAdapter.removeAll(state);

const reducer = createReducer(
  initialState,

  on(BooksActions.searchBooks, searchBooksHandler),
  on(BooksActions.searchBooksSuccess, searchBooksSuccessHandler),
  on(BooksActions.searchBooksFailure, searchBooksErrorHandler),
  on(BooksActions.clearSearch, clearStateHandler)
);

export function booksReducer(state: BooksState | undefined, action: Action): BooksState {
  return reducer(state, action);
}
