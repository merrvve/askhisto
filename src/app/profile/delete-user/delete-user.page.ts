import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ToolbarComponent } from "src/app/ui/toolbar/toolbar.component";
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.page.html',
  styleUrls: ['./delete-user.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent,  CommonModule, FormsModule, ToolbarComponent]
})
export class DeleteUserPage implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

   deleteAccount() {
    // Hesap silme işlemini başlat
    // Burada gerçek API çağrısını yapmalısınız
    alert('Your account will be deleted permanently.');
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
