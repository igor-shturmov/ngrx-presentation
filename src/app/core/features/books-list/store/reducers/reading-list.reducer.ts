import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as ReadingListActions from '../actions/reading-list.action';
import { ReadingListItem } from '../../interfaces/book';

export const READING_LIST_FEATURE_KEY = 'readingList';

export interface ReadingListState extends EntityState<ReadingListItem> {
  loaded: boolean;
  error: null | string;
}

export interface ReadingListPartialState {
  readonly [READING_LIST_FEATURE_KEY]: ReadingListState;
}

// provides method for creating an adapter for using Entity API
// take selectId method if entity don't have id by itself, and sorting function, but it faster without it
export const readingListAdapter: EntityAdapter<ReadingListItem> = createEntityAdapter<ReadingListItem>({
  selectId: item => item.bookId
});

// create an initial state, take an object of initial data
export const initialState: ReadingListState = readingListAdapter.getInitialState({
  loaded: false,
  error: null
});

const initHandler = (state: ReadingListState): ReadingListState => ({
  ...state,
  loaded: false,
  error: null
});

// using CRUD method for setting all books that already in list
const loadReadingListSuccessHandler = (state: ReadingListState,
                                       { payload }): ReadingListState => readingListAdapter.setAll(payload, {
  ...state,
  loaded: true
});

const loadReadingListErrorHandler = (state: ReadingListState, { payload }): ReadingListState => ({
  ...state,
  error: payload
});

// using CRUD methods for adding and delete single book from list
const addToReadingListHandler = (state, { payload }) => readingListAdapter.addOne({ bookId: payload.id, ...payload }, state);
const removeFromReadingListHandler = (state, { payload }) => readingListAdapter.removeOne(payload.bookId, state);

const reducer = createReducer(
  initialState,

  on(ReadingListActions.init, initHandler),
  on(ReadingListActions.loadReadingListSuccess, loadReadingListSuccessHandler),
  on(ReadingListActions.loadReadingListError, loadReadingListErrorHandler),
  on(ReadingListActions.addToReadingList, addToReadingListHandler),
  on(ReadingListActions.removeFromReadingList, removeFromReadingListHandler)
);

export function readingListReducer(state: ReadingListState | undefined, action: Action): ReadingListState {
  return reducer(state, action);
}
