import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonIcon } from '@ionic/angular/standalone';
import {  IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/angular/standalone';

import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonIcon, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton
  ]
})
export class LoginPage  {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async loginEmail() {
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/home'], { replaceUrl: true });
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  }

  async loginWithGoogle() {
    try {
      await this.authService.signInWithGoogle();
      this.router.navigate(['/home'], { replaceUrl: true });
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  }

}
