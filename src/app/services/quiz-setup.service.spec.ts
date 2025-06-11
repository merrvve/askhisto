import { TestBed } from '@angular/core/testing';

import { QuizSetupService } from './quiz-setup.service';

describe('QuizSetupService', () => {
  let service: QuizSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
