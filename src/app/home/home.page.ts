import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton, IonContent, ModalController, IonIcon, IonCard,IonThumbnail, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonLabel, IonRow } from '@ionic/angular/standalone';
import { QuizSetupService } from '../services/quiz-setup.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    //IonRow, 
    IonLabel, IonIcon, IonItem, IonList,
     IonTitle, IonToolbar, IonHeader, 
     IonCardContent,IonThumbnail, IonCardSubtitle, IonCardTitle, IonCardHeader,  IonCard,  IonButton, IonCard, IonContent],
})
export class HomePage {
  constructor(
    private router: Router,
    private quizSetupService: QuizSetupService
  ) {}

  startQuiz() {
    this.quizSetupService.reset(); // clear any previous settings
    this.router.navigate(['/subject-select']);
  }
}
