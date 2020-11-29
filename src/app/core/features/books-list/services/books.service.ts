import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Books, BooksResponse } from '../interfaces/book';
import { HttpClient } from '@angular/common/http';
import { booksResponseToBooks } from '../utils/books-mapper';

@Injectable({ providedIn: 'root' })
export class BooksService {

  constructor(private readonly http: HttpClient) {
  }

  search(term: string): Observable<Books> {
    if (!term) {
      throw new Error('Missing serach term');
    }

    return this.http
      .get<BooksResponse>(`https://www.googleapis.com/books/v1/volumes?q=${ term }`)
      .pipe(booksResponseToBooks);
  }
}
