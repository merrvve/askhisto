import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle,IonThumbnail, IonToolbar, IonButton, IonCard, IonIcon, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonLabel, IonChip, IonSpinner, IonCol, IonAvatar } from '@ionic/angular/standalone';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { TruncatePipe } from 'src/app/pipes/truncate.pipe';
import { PostService } from 'src/app/services/forum/post.service';
import { FirebaseDatePipe } from 'src/app/pipes/firebase-date.pipe';

@Component({
  selector: 'app-forum-home',
  templateUrl: './forum-home.page.html',
  styleUrls: ['./forum-home.page.scss'],
  standalone: true,
  imports: [IonAvatar, IonSpinner, IonChip, IonLabel, IonItem, IonList, TruncatePipe,
    // IonThumbnail,
    FirebaseDatePipe,
    IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonIcon, IonCard, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ForumHomePage implements OnInit {
 posts$!: Observable<Post[]>;
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.posts$ = this.postService.getLatestPosts(10);
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
