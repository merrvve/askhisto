import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StainSelectPage } from './stain-select.page';

describe('StainSelectPage', () => {
  let component: StainSelectPage;
  let fixture: ComponentFixture<StainSelectPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StainSelectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
