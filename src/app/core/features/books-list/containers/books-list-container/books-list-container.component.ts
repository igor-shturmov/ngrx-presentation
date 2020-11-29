import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { getAllBooks, ReadingListBook } from '../../store/selectors/reading-list.selector';
import { Store } from '@ngrx/store';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Book } from '../../interfaces/book';
import { addToReadingList } from '../../store/actions/reading-list.action';
import { clearSearch, searchBooks } from '../../store/actions/books.action';

@Component({
  selector: 'app-books-list-container',
  templateUrl: './books-list-container.component.html',
  styleUrls: ['./books-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksListContainerComponent implements AfterViewInit, OnDestroy {
  books$: Observable<ReadingListBook[]> = this.store.select(getAllBooks);
  destroy$: Subject<void> = new Subject<void>();

  searchForm: FormGroup = this.fb.group({
    term: ''
  });

  constructor(private readonly store: Store,
              private readonly fb: FormBuilder) {
  }

  get searchTermControl(): AbstractControl {
    return this.searchForm.controls.term;
  }

  ngAfterViewInit(): void {
    this.searchTermControl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300)
      )
      .subscribe((value: string) => this.searchBooks(value));
  }

  addBookToReadingList(book: Book): void {
    this.store.dispatch(addToReadingList(book));
  }

  searchExample(): void {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks(this.searchTermControl.value);
  }

  searchBooks(term: string): void {
    if (term) {
      this.store.dispatch(searchBooks(term));
    } else {
      this.store.dispatch(clearSearch());
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
