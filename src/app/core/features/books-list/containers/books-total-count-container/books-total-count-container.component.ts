import { ChangeDetectionStrategy, Component } from '@angular/core';
import { getTotalUnread } from '../../store/selectors/reading-list.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-books-total-count-container',
  templateUrl: './books-total-count-container.component.html',
  styleUrls: ['./books-total-count-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksTotalCountContainerComponent {
  totalUnread$ = this.store.select(getTotalUnread);

  constructor(private readonly store: Store) {}
}
