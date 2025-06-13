import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton, IonContent, ModalController, IonIcon } from '@ionic/angular/standalone';
import { QuizSetupService } from '../services/quiz-setup.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [ IonButton],
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
