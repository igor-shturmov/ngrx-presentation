import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Book, ReadingListItem } from '../interfaces/book';
import { Observable, of } from 'rxjs';

const KEY = '[Books API] Reading List';

@Injectable({ providedIn: 'root' })
export class ReadingListService {

  private readonly storage = new StorageService<ReadingListItem[]>(KEY, []);

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
