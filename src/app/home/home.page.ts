import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton, IonContent, ModalController, IonIcon, IonCard,IonThumbnail, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonLabel, IonRow, IonChip, IonAvatar } from '@ionic/angular/standalone';
import { QuizSetupService } from '../services/quiz-setup.service';
import { PostService } from '../services/forum/post.service';
import { Observable } from 'rxjs';
import { Post } from '../models/Post';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { FirebaseDatePipe } from '../pipes/firebase-date.pipe';
import { ToolbarComponent } from "../ui/toolbar/toolbar.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonAvatar, IonChip,
    //IonRow, 
    IonLabel, IonIcon, IonItem, IonList,
    IonCardContent, IonThumbnail, 
    //IonCardSubtitle, 
    IonCardTitle, IonCardHeader, IonCard, IonButton, IonCard, IonContent,
    AsyncPipe, TruncatePipe, FirebaseDatePipe, ToolbarComponent],
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
    this.router.navigate(['/quiz']);
  }

  Qod() {
    this.quizSetupService.reset(); // clear any previous settings
    this.router.navigate(['/question-of-the-day']);
  }

  
 
  ngOnInit() {
    this.posts$ = this.postService.getLatestPosts(5);
  }

  viewDetails(post: Post) {
    this.postService.currentPost = post;
    this.router.navigate([`/post/${post.id}`]);
  }

  viewAllPosts() {
    console.log('Navigate to all posts');
    // TODO: Navigate to full post list page
  }
}
