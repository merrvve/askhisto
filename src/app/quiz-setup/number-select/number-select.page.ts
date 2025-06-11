import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonCol, IonContent, IonGrid, IonHeader,  IonIcon,  IonRow, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { QuizSetupService } from 'src/app/services/quiz-setup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-number-select',
  templateUrl: './number-select.page.html',
  styleUrls: ['./number-select.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonGrid, IonRow, IonCol, IonIcon]
})
export class NumberSelectPage implements OnInit {

  numberOptions = [5, 10, 20, 50];

  constructor(public setupService: QuizSetupService, private router: Router) { }

  toggleSelection (number: number) {
    this.setupService.settings.numberOfQuestions = number;
  }

  isSelected (number: number) {
    return this.setupService.settings.numberOfQuestions === number;
  }
  ngOnInit() {
  }

  next() {
    this.router.navigate(['/quiz'])
  }

}
