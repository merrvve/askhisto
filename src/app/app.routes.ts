import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'subject-select',
    loadComponent: () => import('./quiz-setup/subject-select/subject-select.page').then( m => m.SubjectSelectPage)
  },
  {
    path: 'stain-select',
    loadComponent: () => import('./quiz-setup/stain-select/stain-select.page').then( m => m.StainSelectPage)
  },
  {
    path: 'number-select',
    loadComponent: () => import('./quiz-setup/number-select/number-select.page').then( m => m.NumberSelectPage)
  },
  {
    path: 'quiz',
    loadComponent: () => import('./quiz/quiz/quiz.page').then( m => m.QuizPage)
  },
];
