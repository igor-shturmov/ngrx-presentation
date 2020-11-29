import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { getRouterParams } from '../../../../store/selectors/router.selector';

@Component({
  selector: 'app-book-details-container',
  templateUrl: './book-details-container.component.html',
  styleUrls: ['./book-details-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsContainerComponent {
  params$: Observable<Params> = this.store.pipe(select(getRouterParams));

  constructor(private readonly store: Store) {
  }
}
