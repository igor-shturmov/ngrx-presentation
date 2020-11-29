import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList } from '../../store/selectors/reading-list.selector';
import { removeFromReadingList } from '../../store/actions/reading-list.action';

@Component({
  selector: 'app-books-reading-list-container',
  templateUrl: './books-reading-list-container.component.html',
  styleUrls: ['./books-reading-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksReadingListContainerComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store) {
  }

  removeFromReadingList(item): void {
    this.store.dispatch(removeFromReadingList(item));
  }

}
