import { Component, OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonSelect, IonItem, IonLabel, IonButton, IonSelectOption, IonInput, IonDatetime } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { Post } from 'src/app/models/Post';


@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.page.html',
  styleUrls: ['./ask-question.page.scss'],
  standalone: true,
  imports: [ IonButton, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar,  FormsModule,
    IonSelectOption, IonInput, IonSelect
  ]
})
export class AskQuestionPage implements OnInit {
  user: User | null = null;
  private authSub?: Subscription;

  post: Post = {
    type: 'whichTissue',
    content: '',
    images: [],
    subjects: [],
    tags: [],
    stainingMethods: [],
    addedBy: '',
    addedDate: new Date().toISOString(),
  };
  
  constructor(
    private authService: AuthService,
    private router: Router,
    
    
  ) { 
     
  }

  ngOnInit() {
    this.authSub = this.authService.user$.subscribe(user => {
      this.user = user;
      // if (!user) {
      //   // Redirect to login page if not authenticated
      //   this.router.navigate(['/login'], { replaceUrl: true });
      // }
    });
    
  }

  

  onSubmit() {
    console.log('Submitted Post:', this.post);
    // TODO: send to Firestore or backend
  } 

}
