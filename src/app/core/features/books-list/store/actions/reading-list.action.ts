import { createAction } from '@ngrx/store';
import { Book, ReadingListItem } from '../../interfaces/book';
import { createPayload } from '../../../../utils/create-payload';

enum ACTION_TYPES {
  INIT = '[Reading List] Initialize',

  LOAD_READING_LIST_SUCCESS = '[Reading List] Load list success',
  LOAD_READING_LIST_ERROR = '[Reading List] Load list error',

  ADD_TO_LIST = '[Reading List] Add to list',
  ADD_TO_LIST_SUCCESS = '[Reading List] Add to list success',
  ADD_TO_LIST_ERROR = '[Reading List] Add to list error',

  REMOVE_FROM_LIST = '[Reading List] Remove to list',
  REMOVE_FROM_LIST_SUCCESS = '[Reading List] Remove to list success',
  REMOVE_FROM_LIST_ERROR = '[Reading List] Remove to list error',
}

// GET LIST
export const init = createAction(ACTION_TYPES.INIT);
export const loadReadingListSuccess = createAction(ACTION_TYPES.LOAD_READING_LIST_SUCCESS, createPayload<ReadingListItem[]>());
export const loadReadingListError = createAction(ACTION_TYPES.LOAD_READING_LIST_ERROR, createPayload<string>());

// ADD TO LIST
export const addToReadingList = createAction(ACTION_TYPES.ADD_TO_LIST, createPayload<Book>());
export const failedAddToReadingList = createAction(ACTION_TYPES.ADD_TO_LIST_ERROR, createPayload<Book>());
export const confirmedAddToReadingList = createAction(ACTION_TYPES.ADD_TO_LIST_SUCCESS, createPayload<Book>());

// REMOVE FROM LIST
export const removeFromReadingList = createAction(ACTION_TYPES.REMOVE_FROM_LIST, createPayload<ReadingListItem>());
export const failedRemoveFromReadingList = createAction(ACTION_TYPES.REMOVE_FROM_LIST_ERROR, createPayload<ReadingListItem>());
export const confirmedRemoveFromReadingList = createAction(ACTION_TYPES.REMOVE_FROM_LIST_SUCCESS, createPayload<ReadingListItem>());
