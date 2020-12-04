import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Book, ReadingListItem } from '../interfaces/book';
import { Observable, of } from 'rxjs';
import { READING_LIST_KEY } from '../utils/constants';

@Injectable({ providedIn: 'root' })
export class ReadingListService {

  private readonly storage = new StorageService<ReadingListItem[]>(READING_LIST_KEY, []);

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
