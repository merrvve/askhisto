import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AskQuestionPage } from './ask-question.page';

describe('AskQuestionPage', () => {
  let component: AskQuestionPage;
  let fixture: ComponentFixture<AskQuestionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AskQuestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
