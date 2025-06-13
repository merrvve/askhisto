import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonCol,  IonGrid, IonIcon, IonRow, IonTitle, IonContent, IonHeader, IonToolbar, IonFab, IonFabButton, IonLabel } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { QuizSetupService } from 'src/app/services/quiz-setup.service';

@Component({
  selector: 'app-subject-select',
  templateUrl: './subject-select.page.html',
  styleUrls: ['./subject-select.page.scss'],
  standalone: true,
  imports: [ IonFabButton, IonFab, IonHeader, IonContent, CommonModule, FormsModule, IonButton, IonGrid, IonRow, IonCol, IonIcon, IonTitle,  IonToolbar]
})
export class SubjectSelectPage implements OnInit {

  subjectOptions = [
    "ALL",
  "Epithelium",
  "Connective",
  "Muscle",
  "Nervous",
  "Cardiovascular",
  "Skin",
  "Digestive",
  "Respiratory",
  "Lymphoid",
  "Urinary",
  "Endocrine",
  "Reproductive",
  "Eye",
  "Ear"
];


  constructor(public setupService: QuizSetupService, private router: Router) {}

  toggleSelection(subject: string) {
  const subjects = this.setupService.settings.subjects;

  if (subject === 'ALL') {
    // If user taps ALL, clear everything else and set only ALL
    this.setupService.settings.subjects = ['ALL'];
    return;
  }

  // If any other subject is tapped, first remove ALL if it exists
  const allIdx = subjects.indexOf('ALL');
  if (allIdx > -1) {
    subjects.splice(allIdx, 1);
  }

  // Now toggle the tapped subject
  const idx = subjects.indexOf(subject);
  if (idx > -1) {
    subjects.splice(idx, 1);
  } else {
    subjects.push(subject);
  }

  // (Optional) If they just deselected the last subject, you can re-add ALL:
  if (subjects.length === 0) {
    this.setupService.settings.subjects = ['ALL'];
  }
}


  isSelected(subject: string) {
    return this.setupService.settings.subjects.includes(subject);
  }

  next() {
    this.router.navigate(['/number-select']);
  }
  ngOnInit() {
  }

}
