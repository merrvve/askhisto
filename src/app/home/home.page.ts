import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton, IonContent, ModalController, IonIcon, IonCard,IonThumbnail, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonLabel, IonRow } from '@ionic/angular/standalone';
import { QuizSetupService } from '../services/quiz-setup.service';
import { PostService } from '../services/forum/post.service';
import { Observable } from 'rxjs';
import { Post } from '../models/Post';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { TruncatePipe } from '../pipes/truncate.pipe';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    //IonRow, 
    IonLabel, IonIcon, IonItem, IonList,
     IonTitle, IonToolbar, IonHeader, 
     IonCardContent,IonThumbnail, IonCardSubtitle, IonCardTitle, IonCardHeader,  IonCard,  IonButton, IonCard, IonContent,
    AsyncPipe, TruncatePipe],
})
export class HomePage {
  posts$!: Observable<Post[]>;

  constructor(
    private router: Router,
    private quizSetupService: QuizSetupService,
    private postService: PostService
  ) {}

  startQuiz() {
    this.quizSetupService.reset(); // clear any previous settings
    this.router.navigate(['/subject-select']);
  }

  
 
  ngOnInit() {
    this.posts$ = this.postService.getLatestPosts(5);
  }

  viewDetails(post: Post) {
    console.log('Post:', post);
    // TODO: Add navigation to details page here
  }

  viewAllPosts() {
    console.log('Navigate to all posts');
    // TODO: Navigate to full post list page
  }
}
