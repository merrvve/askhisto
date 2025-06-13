import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle,IonThumbnail, IonToolbar, IonButton, IonCard, IonIcon, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { TruncatePipe } from 'src/app/pipes/truncate.pipe';

@Component({
  selector: 'app-forum-home',
  templateUrl: './forum-home.page.html',
  styleUrls: ['./forum-home.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonList, TruncatePipe, IonThumbnail,
    IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonIcon, IonCard, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ForumHomePage implements OnInit {
 posts$!: Observable<Post[]>;
  constructor() { }

  ngOnInit() {
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
