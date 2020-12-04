import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Book, BooksResponse, ReadingListItem } from '../../books-list/interfaces/book';
import { bookResponseToBook } from '../utils/book-response-mapper';
import { StorageService } from '../../books-list/services/storage.service';
import { READING_LIST_KEY } from '../../books-list/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class BookDetailsService {
  private readonly storage = new StorageService<ReadingListItem[]>(READING_LIST_KEY, []);

  constructor(private readonly http: HttpClient) {
  }

  getBook(id: string): Observable<Book> {
    if (!id) {
      throw new Error('Missing book id');
    }

    return this.http
      .get<BooksResponse>(`https://www.googleapis.com/books/v1/volumes/${ id }`)
      .pipe(bookResponseToBook);
  }

  getList(): Observable<ReadingListItem[]> {
    return of(this.storage.read());
  }

  addBook(b: Book): Observable<null> {
    this.storage.update(list => {
      const { id, ...rest } = b;
      list.push({
        bookId: id,
        ...rest
      });
      return list;
    });

    return of(null);
  }

  removeBook(id: string): Observable<null> {
    this.storage.update(list => {
      return list.filter(x => x.bookId !== id);
    });

    return of(null);
  }
}
