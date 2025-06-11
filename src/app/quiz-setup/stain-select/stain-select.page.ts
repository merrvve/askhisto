import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonRow, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { QuizSetupService } from 'src/app/services/quiz-setup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stain-select',
  templateUrl: './stain-select.page.html',
  styleUrls: ['./stain-select.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonGrid,IonRow,IonCol,IonButton,  IonIcon]
})
export class StainSelectPage implements OnInit {

  stainOptions = ['ALL','H&E', 'PAS', 'Hemaulan', 'Masson Trichrome', 'Mallory Azan'];

   constructor(public setupService: QuizSetupService, private router: Router) {}

  toggleSelection(subject: string) {
  const stainingMethods = this.setupService.settings.stainingMethods;

  if (subject === 'ALL') {
    // If user taps ALL, clear everything else and set only ALL
    this.setupService.settings.stainingMethods = ['ALL'];
    return;
  }

  // If any other subject is tapped, first remove ALL if it exists
  const allIdx = stainingMethods.indexOf('ALL');
  if (allIdx > -1) {
    stainingMethods.splice(allIdx, 1);
  }

  // Now toggle the tapped subject
  const idx = stainingMethods.indexOf(subject);
  if (idx > -1) {
    stainingMethods.splice(idx, 1);
  } else {
    stainingMethods.push(subject);
  }

  // (Optional) If they just deselected the last subject, you can re-add ALL:
  if (stainingMethods.length === 0) {
    this.setupService.settings.stainingMethods = ['ALL'];
  }
}


  isSelected(subject: string) {
    return this.setupService.settings.stainingMethods.includes(subject);
  }

  next() {
    this.router.navigate(['/number-select']);
  }
  ngOnInit() {
  }

}
