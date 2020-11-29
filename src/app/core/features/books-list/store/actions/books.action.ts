import { createAction } from '@ngrx/store';
import { Books } from '../../interfaces/book';
import { createPayload } from '../../../../utils/create-payload';

enum ACTION_TYPES {
  SEARCH_BOOKS = '[Books] Search',
  SEARCH_BOOKS_SUCCESS = '[Books] Search Success',
  SEARCH_BOOKS_ERROR = '[Books] Search Error',

  CLEAR_SEARCH = '[Books] Clear Search',
}

export const searchBooks = createAction(ACTION_TYPES.SEARCH_BOOKS, createPayload<string>());
export const searchBooksSuccess = createAction(ACTION_TYPES.SEARCH_BOOKS_SUCCESS, createPayload<Books>());
export const searchBooksFailure = createAction(ACTION_TYPES.SEARCH_BOOKS_ERROR, createPayload<string>());

export const clearSearch = createAction(ACTION_TYPES.CLEAR_SEARCH);
