import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksTotalCountContainerComponent } from './books-total-count-container.component';

describe('BooksTotalCountContainerComponent', () => {
  let component: BooksTotalCountContainerComponent;
  let fixture: ComponentFixture<BooksTotalCountContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksTotalCountContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksTotalCountContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
