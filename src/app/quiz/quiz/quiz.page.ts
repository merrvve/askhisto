import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonicSlides, IonItem, IonItemSliding, IonLabel, IonList, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Question } from 'src/app/models/Question';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/services/quiz/questions.service';
import { QuizSetting } from 'src/app/models/QuizSetting';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard,IonButton, IonText, IonCardContent, IonRow,
    IonGrid, IonCol
  ]
})
export class QuizPage implements OnInit {
  selectedChoice?: number | null = null;
  
  questions: Question[] = [];
  currentIndex: number = 0;
  isComplete: boolean = false;
  constructor(private router: Router,
    private questionService: QuestionService
  ) { }

  ngOnInit(): void {
    const settings: QuizSetting = {
      subjects: ['Connective Tissue'],
      stainingMethods: ['H&E'],
      tags: ['muscle'],
      questionType: 'whichTissue',
      numberOfQuestions: 5,
      randomize: false
    };

    this.questionService.getQuestionsByQuizSetting(settings).subscribe(qs => {
      this.questions = qs;
      console.log(qs);
    });
  }

  nextQuestion() {
    this.currentIndex += 1;
    this.selectedChoice = null;
    if(this.currentIndex > this.questions.length-1) {
      this.isComplete = true;
    }
  }

  selectAnswer(choice: number) {
    this.selectedChoice = choice;
  }

  Reload() {
     this.selectedChoice = null;
    this.currentIndex=0;
    this.isComplete = false;
  }

getChoiceColor(index: number): string {
  const isSelected = this.selectedChoice === index;
  const isCorrect = index === this.questions[this.currentIndex].rightChoice;

  if (isSelected && isCorrect) return 'success';       // Selected and correct
  if (isSelected && !isCorrect) return 'danger';       // Selected and wrong
  if (!isSelected && isCorrect && this.selectedChoice !== null) return 'success'; // Reveal correct after answer
  return 'medium';                                     // Default
}

Home() {
  this.router.navigate(['/'])
}
  

}
