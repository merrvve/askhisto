import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, updateDoc, deleteDoc, query, where, limit, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Question } from 'src/app/models/Question';
import { QuizSetting } from 'src/app/models/QuizSetting';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  firestore = inject(Firestore);
  private questionCollection = collection(this.firestore, 'questions');
  
  constructor() {}

  // Create a question
  addQuestion(question: Question): Promise<void> {
    const questionToAdd = {
      ...question,
      addedDate: question.addedDate instanceof Date ? question.addedDate.toISOString() : question.addedDate
    };
    return addDoc(this.questionCollection, questionToAdd).then(() => {});
  }

  // Get question by ID
  getQuestionById(id: string): Observable<Question | undefined> {
    const docRef = doc(this.firestore, `questions/${id}`);
    return docData(docRef, { idField: 'id' }) as Observable<Question>;
  }

  // Update question
  updateQuestion(id: string, question: Partial<Question>): Promise<void> {
    const docRef = doc(this.firestore, `questions/${id}`);
    return updateDoc(docRef, question);
  }

  // Delete question
  deleteQuestion(id: string): Promise<void> {
    const docRef = doc(this.firestore, `questions/${id}`);
    return deleteDoc(docRef);
  }

  getQuestionsByQuizSetting(settings: QuizSetting): Observable<Question[]> {
    let constraints: any[] = [];

    if (settings.subjects?.length) {
      constraints.push(where('subjects', 'array-contains-any', settings.subjects));
    }

    if (settings.randomize) {
      constraints.push(orderBy('addedDate')); // you can order by date if you want pseudo-random
    }

    constraints.push(limit(settings.numberOfQuestions));

    const q = query(this.questionCollection, ...constraints);

    return collectionData(q, { idField: 'id' }) as Observable<Question[]>;
  }
}
