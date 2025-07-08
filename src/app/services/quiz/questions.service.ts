import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, updateDoc, deleteDoc, query, where, limit, orderBy, startAt, getDocs } from '@angular/fire/firestore';
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
    addedDate: question.addedDate instanceof Date ? question.addedDate.toISOString() : question.addedDate,
    random: Math.random() // Add this line
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
  const useSubjectFilter = settings.subjects?.length && !(settings.subjects.length === 1 && settings.subjects[0] === 'ALL');

  if (useSubjectFilter) {
    constraints.push(where('subjects', 'array-contains-any', settings.subjects));
  }

  if (settings.randomize) {
    // Use the random field instead of addedDate
    constraints.push(orderBy('random'));
  } else {
    // Default ordering when not random
    constraints.push(orderBy('addedDate', 'desc'));
  }

  constraints.push(limit(settings.numberOfQuestions));

  const q = query(this.questionCollection, ...constraints);
  return collectionData(q, { idField: 'id' }) as Observable<Question[]>;
}

// Add this to your QuestionService
getRandomQuestions(count: number, subjects?: string[]): Observable<Question[]> {
  const randomSeed = Math.random();
  let constraints: any[] = [
    orderBy('random'),
    startAt(randomSeed),
    limit(count)
  ];

  if (subjects && subjects.length && !(subjects.length === 1 && subjects[0] === 'ALL')) {
    constraints.push(where('subjects', 'array-contains-any', subjects));
  }

  const q = query(this.questionCollection, ...constraints);
  return collectionData(q, { idField: 'id' }) as Observable<Question[]>;
}

getLatestQuestion(): Observable<Question | null> {
   
      const q = query(
        this.questionCollection,
        orderBy('addedDate', 'desc'), // Assuming you have a createdAt timestamp field
        limit(1)
      );
      return collectionData(q, { idField: 'id' }).pipe(
      map(questions => {
        if (questions.length === 0) {
          console.log(questions)
          return null;
        }
        
        return questions[0] as Question;
      })
    );
    }

}
