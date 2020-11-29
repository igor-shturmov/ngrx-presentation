import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-total-count',
  templateUrl: './total-count.component.html',
  styleUrls: ['./total-count.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TotalCountComponent {
  @Input() totalCount: number;
}
