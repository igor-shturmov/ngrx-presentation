import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksListContainerComponent } from './books-list-container.component';

describe('BooksListContainerComponent', () => {
  let component: BooksListContainerComponent;
  let fixture: ComponentFixture<BooksListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksListContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
