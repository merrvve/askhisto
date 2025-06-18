import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonIcon } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonIcon, IonItem, FormsModule,
    IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonLabel, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RegisterPage implements OnInit {

  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  statusMessage: string = '';
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  registerWithGoogle() {
  this.authService.signInWithGoogle().then(() => {
    this.router.navigate(['/profile']);
  }).catch(error => {
    console.error('Google sign-in failed:', error);
  }).finally(() => {
    this.router.navigate(['/profile']);
  });
}

  registerWithEmail() {}
  goToLogin() {
    this.router.navigate(['/login']);
  }

}
