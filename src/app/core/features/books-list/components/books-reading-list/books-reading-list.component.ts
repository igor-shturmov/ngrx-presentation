import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ReadingListItem } from '../../interfaces/book';

@Component({
  selector: 'app-books-reading-list',
  templateUrl: './books-reading-list.component.html',
  styleUrls: ['./books-reading-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksReadingListComponent {
  @Input() readingList: ReadingListItem[];

  @Output() removeFromList: EventEmitter<ReadingListItem> = new EventEmitter<ReadingListItem>();
}
