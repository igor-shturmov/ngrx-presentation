import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailsContainerComponent } from './book-details-container.component';

describe('BookDetailsContainerComponent', () => {
  let component: BookDetailsContainerComponent;
  let fixture: ComponentFixture<BookDetailsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookDetailsContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
