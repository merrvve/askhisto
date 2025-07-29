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
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'login',
    loadComponent: () => import('./profile/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./profile/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'ask-question',
    loadComponent: () => import('./forum/ask-question/ask-question.page').then( m => m.AskQuestionPage)
  },
  {
    path: 'forum',
    loadComponent: () => import('./forum/forum-home/forum-home.page').then( m => m.ForumHomePage)
  },
  {
    path: 'post',
    loadComponent: () => import('./forum/posts/post/post.page').then( m => m.PostPage)
  },
  {
    path: 'post/:id',
    loadComponent: () => import('./forum/posts/post-detail/post-detail.page').then( m => m.PostDetailPage)
  },
  {
    path: 'question-of-the-day',
    loadComponent: () => import('./quiz/qod/qod.page').then( m => m.QodPage)
  },
  {
    path: 'delete-user',
    loadComponent: () => import('./profile/delete-user/delete-user.page').then( m => m.DeleteUserPage)
  },
];
