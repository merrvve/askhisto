import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle,IonInput, IonToolbar, IonButton, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonIcon, IonToast } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonToast, IonIcon, IonItem, FormsModule,
    IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader,
     IonCard, IonLabel, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonInput]
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
  });
}

  registerWithEmail() {
    this.statusMessage = "Signing in...";
    if(!this.email) {
      this.statusMessage += " Please enter a valid email address.\n"
      return;
    }
    if(!this.password) {
      this.statusMessage += " Please enter a password.\n"
      return;
    }
    if(!this.confirmPassword) {
      this.statusMessage += " Please confirm your password.\n"
      return;
    }
    if(this.password != this.confirmPassword) {
      this.statusMessage += " Passwords are not matched.\n"
      return;
    }

    this.authService.signUp(this.email,this.password).then(() => {
      this.statusMessage = "Success!"
    this.router.navigate(['/profile']);
  }).catch(error => {
    this.statusMessage = 'Sign-in failed: '+ error;
  });


  }
  goToLogin() {
    this.router.navigate(['/login']);
  }

}
