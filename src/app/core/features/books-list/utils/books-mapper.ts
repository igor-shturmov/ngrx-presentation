import { Books, BooksResponse } from '../interfaces/book';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const booksResponseToBooks = (resp$: Observable<BooksResponse>): Observable<Books> => {
  return resp$.pipe(
    map((resp: BooksResponse) => {
      return resp.items.map(item => ({
        id: item.id,
        title: item.volumeInfo?.title,
        authors: item.volumeInfo?.authors || [],
        description: item.searchInfo?.textSnippet,
        publisher: item.volumeInfo?.publisher,
        publishedDate: item.volumeInfo?.publishedDate
          ? new Date(item.volumeInfo?.publishedDate).toISOString()
          : undefined,
        coverUrl: item.volumeInfo?.imageLinks?.thumbnail
      }));
    })
  );
};
