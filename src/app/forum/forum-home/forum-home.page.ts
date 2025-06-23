import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle,IonThumbnail, IonToolbar, IonButton, IonCard, IonIcon, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonLabel, IonChip, IonSpinner, IonCol, IonAvatar, IonRow, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/angular/standalone';
import { BehaviorSubject, Observable } from 'rxjs';
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
  imports: [IonInfiniteScrollContent, IonInfiniteScroll, IonRow, IonAvatar, IonSpinner, IonChip, IonLabel, IonItem, IonList, TruncatePipe,
    // IonThumbnail,
    FirebaseDatePipe,
    IonCardContent,  IonIcon, IonCard, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ForumHomePage implements OnInit {
  posts$ = new BehaviorSubject<Post[]>([]);
  limit = 10;
  lastLoadedIndex = 0;
  loading = false;

  constructor(
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadInitialPosts();
  }

  loadInitialPosts() {
    this.postService.getLatestPosts(this.limit).subscribe((posts) => {
      this.posts$.next(posts);
      this.lastLoadedIndex = posts.length;
    });
  }

  loadMore(event: any) {
    if (this.loading) return;
    this.loading = true;

    this.postService.getLatestPosts(this.limit, this.lastLoadedIndex).subscribe((newPosts) => {
      const current = this.posts$.value;
      this.posts$.next([...current, ...newPosts]);

      this.lastLoadedIndex += newPosts.length;
      event.target.complete();
      this.loading = false;

      if (newPosts.length < this.limit) {
        // No more posts available
        event.target.disabled = true;
      }
    });
  }

  viewDetails(post: Post) {
    this.postService.currentPost = post;
    this.router.navigate([`/post/${post.id}`]);
  }
}