import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BooksPartialState } from '../reducers/books.reducer';
import { getBooks } from './books.selector';
import {
  READING_LIST_FEATURE_KEY,
  readingListAdapter,
  ReadingListPartialState,
  ReadingListState
} from '../reducers/reading-list.reducer';
import { Book, ReadingListItem, Books } from '../../interfaces/book';

export const getReadingListState = createFeatureSelector<
  ReadingListPartialState,
  ReadingListState
  >(READING_LIST_FEATURE_KEY);

const {
  selectEntities,
  selectAll,
  selectTotal
} = readingListAdapter.getSelectors();

export const getReadingListEntities = createSelector(
  getReadingListState,
  selectEntities
);

export interface ReadingListBook extends Book, Omit<ReadingListItem, 'bookId'> {
  isAdded: boolean;
}

export const getAllBooks = createSelector<
  BooksPartialState & ReadingListPartialState,
  Books,
  Record<string, ReadingListItem>,
  ReadingListBook[]
  >(getBooks, getReadingListEntities, (books, entities) => {
  return books.map(b => ({ ...b, isAdded: Boolean(entities[b.id]) }));
});

export const getReadingList = createSelector(getReadingListState, selectAll);

export const getTotalUnread = createSelector(getReadingListState, selectTotal);
