import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NumberSelectPage } from './number-select.page';

describe('NumberSelectPage', () => {
  let component: NumberSelectPage;
  let fixture: ComponentFixture<NumberSelectPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberSelectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
