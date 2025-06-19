import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle,IonThumbnail, IonToolbar, IonButton, IonCard, IonIcon, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonLabel, IonChip, IonSpinner, IonCol, IonAvatar, IonRow } from '@ionic/angular/standalone';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { TruncatePipe } from 'src/app/pipes/truncate.pipe';
import { PostService } from 'src/app/services/forum/post.service';
import { FirebaseDatePipe } from 'src/app/pipes/firebase-date.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forum-home',
  templateUrl: './forum-home.page.html',
  styleUrls: ['./forum-home.page.scss'],
  standalone: true,
  imports: [IonRow, IonAvatar, IonSpinner, IonChip, IonLabel, IonItem, IonList, TruncatePipe,
    // IonThumbnail,
    FirebaseDatePipe,
    IonCardContent,  IonIcon, IonCard, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ForumHomePage implements OnInit {
 posts$!: Observable<Post[]>;
  constructor(private postService: PostService,
    private router: Router
  ) { }

  ngOnInit() {
    this.posts$ = this.postService.getLatestPosts(10);
  }
viewDetails(post: Post) {
    this.postService.currentPost = post;
    this.router.navigate([`/post/${post.id}`]);
  }

  viewAllPosts() {
    console.log('Navigate to all posts');
  }
}
