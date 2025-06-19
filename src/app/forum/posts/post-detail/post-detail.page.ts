import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonChip, IonAvatar, IonLabel, IonSpinner, IonItem } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { FirebaseDatePipe } from 'src/app/pipes/firebase-date.pipe';
import { Comment } from 'src/app/models/Comment';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/services/forum/post.service';
import { ViewChild } from '@angular/core';
import { SwiperContainer } from 'swiper/element';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Swiper } from 'swiper/types';

// Register Swiper custom elements
register();
export interface SwiperSlideChangeEvent {
  swiper: Swiper;
  activeIndex: number;
  realIndex: number;
}

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.page.html',
  styleUrls: ['./post-detail.page.scss'],
  standalone: true,
  imports: [IonItem, IonSpinner, IonLabel, IonAvatar, IonChip, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonIcon, 
    FirebaseDatePipe, 
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class PostDetailPage implements OnInit {

  postId?: string;
  post?: Post | null;
  post$?: Observable<Post>;
  comments$?: Observable<Comment[]>;

 
  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) { }

 ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.postId = id;
        this.loadPost(); // Optional: if fetching post details from a service
        this.loadComments();
      }
    });
  }

  loadPost() {
    console.log(this.postId);
    if(this.postId) {
      this.post = this.postService.getCurrentPostMatchId(this.postId);
      console.log(this.postId, this.post)
      if(!this.post) {
        this.post$ = this.postService.getPostById(this.postId);
      }
    }
    else {
      throw('error getting post id');
    }
    
  }
  loadComments() {}

}
