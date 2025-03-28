import { Routes } from '@angular/router';
import { HomeComponent } from './app/pages/home/home.component';
import { LoginComponent } from './app/pages/auth/login/login.component';
import { PostDetailComponent } from './app/posts/post-detail/post-detail.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'posts/:id', component: PostDetailComponent }
];
