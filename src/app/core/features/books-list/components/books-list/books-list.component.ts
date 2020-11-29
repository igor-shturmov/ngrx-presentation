import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Book, Books } from '../../interfaces/book';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksListComponent {
  @Input() form: FormGroup;

  @Input() books: Books;

  @Output() showExample: EventEmitter<null> = new EventEmitter<null>();
  @Output() addBook: EventEmitter<Book> = new EventEmitter<Book>();

  formatDate(date: void | string): string | undefined {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }
}
