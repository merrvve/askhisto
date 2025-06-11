import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubjectSelectPage } from './subject-select.page';

describe('SubjectSelectPage', () => {
  let component: SubjectSelectPage;
  let fixture: ComponentFixture<SubjectSelectPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectSelectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
