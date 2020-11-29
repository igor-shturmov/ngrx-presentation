import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book, BooksResponse } from '../../books-list/interfaces/book';
import { bookResponseToBook } from '../utils/book-response-mapper';

@Injectable({
  providedIn: 'root'
})
export class BookDetailsService {
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
}
