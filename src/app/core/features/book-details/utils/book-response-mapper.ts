import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../../books-list/interfaces/book';

export const bookResponseToBook = (resp$: Observable<any>): Observable<Book> => {
  return resp$.pipe(
    map((item) => {
      return {
        id: item.id,
        title: item.volumeInfo?.title,
        authors: item.volumeInfo?.authors || [],
        description: item.searchInfo?.textSnippet,
        publisher: item.volumeInfo?.publisher,
        publishedDate: item.volumeInfo?.publishedDate
          ? new Date(item.volumeInfo?.publishedDate).toISOString()
          : undefined,
        coverUrl: item.volumeInfo?.imageLinks?.thumbnail
      };
    }));
};
