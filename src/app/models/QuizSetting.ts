export interface QuizSetting {
  subjects: string[];
  stainingMethods: string[];
  tags?: string[];
  questionType: 'whichTissue' | string;
  numberOfQuestions: number;
  randomize?: boolean;
}
