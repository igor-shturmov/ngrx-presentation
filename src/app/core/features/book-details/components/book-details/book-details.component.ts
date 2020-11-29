import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BookStore } from '../../store/book-store';
import { Observable } from 'rxjs';
import { Book } from '../../../books-list/interfaces/book';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  providers: [BookStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent {
  @Input() set id(value: string) {
    this.store.getBook(value);
  }

  book$: Observable<Book> = this.store.selectBook();

  constructor(private store: BookStore) {
  }
}
