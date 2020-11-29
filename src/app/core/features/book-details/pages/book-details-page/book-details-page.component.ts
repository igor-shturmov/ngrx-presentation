import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-book-details-page',
  templateUrl: './book-details-page.component.html',
  styleUrls: ['./book-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsPageComponent {
}
