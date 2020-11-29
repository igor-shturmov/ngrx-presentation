import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksReadingListComponent } from './books-reading-list.component';

describe('BooksReadingListComponent', () => {
  let component: BooksReadingListComponent;
  let fixture: ComponentFixture<BooksReadingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksReadingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksReadingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
