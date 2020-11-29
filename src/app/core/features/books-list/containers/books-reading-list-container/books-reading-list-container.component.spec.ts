import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksReadingListContainerComponent } from './books-reading-list-container.component';

describe('BooksReadingListContainerComponent', () => {
  let component: BooksReadingListContainerComponent;
  let fixture: ComponentFixture<BooksReadingListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksReadingListContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksReadingListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
