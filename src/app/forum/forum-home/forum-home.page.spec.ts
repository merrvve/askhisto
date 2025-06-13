import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForumHomePage } from './forum-home.page';

describe('ForumHomePage', () => {
  let component: ForumHomePage;
  let fixture: ComponentFixture<ForumHomePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
