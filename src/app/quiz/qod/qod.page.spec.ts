import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QodPage } from './qod.page';

describe('QodPage', () => {
  let component: QodPage;
  let fixture: ComponentFixture<QodPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
