import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle,IonIcon, IonToolbar, IonCard, IonCardHeader, IonButton, IonNote, IonLabel, IonAvatar, IonItem, IonList, IonCardContent,IonCardTitle, IonCardSubtitle } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { ToolbarComponent } from "../../ui/toolbar/toolbar.component";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonCardHeader, IonCard, IonContent, CommonModule, FormsModule,
    IonButton,
    //IonNote, IonLabel, IonItem, IonList, 
    IonCardContent, IonCardSubtitle, IonCardTitle, IonAvatar, IonIcon, ToolbarComponent]
})
export class ProfilePage implements OnInit {

  user: User | null = null;
  private authSub?: Subscription;
  defaultAvatar = "https://avatar.iran.liara.run/public/9";
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authSub = this.authService.user$.subscribe(user => {
      this.user = user;
      if (!user) {
        // Redirect to login page if not authenticated
        this.router.navigate(['/login'], { replaceUrl: true });
      }
    });
    // this.user= {
    //   uid: '',
    //   displayName: 'Merve',
    //   email: 'kasljfh@slkdfjls.com',
    //   phoneNumber: '546546'
    // }
  }
  logout() {
    this.authService.logout();
  }
  deleteAccount() {
    this.router.navigate(['/delete-user']);
  }
  ngOnDestroy() {
    this.authSub?.unsubscribe();
  }
}
