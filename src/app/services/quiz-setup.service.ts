import { Injectable } from '@angular/core';
import { QuizSetting } from '../models/QuizSetting';

@Injectable({
  providedIn: 'root'
})
export class QuizSetupService {

  settings: QuizSetting = {
    subjects: ['ALL'],
    stainingMethods: ['ALL'],
    questionType: 'whichTissue',
    numberOfQuestions: 5,
  };

  reset() {
    this.settings = {
      subjects: ['ALL'],
      stainingMethods: ['ALL'],
      questionType: 'whichTissue',
      numberOfQuestions: 5,
    };
  }
  constructor() { }
}
