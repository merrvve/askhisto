import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import {
  IonContent,
  IonAlert,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonChip,
  IonAvatar,
  IonLabel,
  IonSpinner,
  IonItem,
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { FirebaseDatePipe } from 'src/app/pipes/firebase-date.pipe';
import { Comment } from 'src/app/models/Comment';
import { map, Observable } from 'rxjs';
import { PostService } from 'src/app/services/forum/post.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Swiper } from 'swiper/types';
import { ToolbarComponent } from 'src/app/ui/toolbar/toolbar.component';
import { CommentService } from 'src/app/services/forum/comment.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/User';

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
  imports: [
    IonItem,
    IonSpinner,
    IonLabel,
    IonAvatar,
    IonChip,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonIcon,
    FirebaseDatePipe,
    IonAlert,
    IonContent,
    CommonModule,
    FormsModule,
    ToolbarComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PostDetailPage implements OnInit {
  selectedComment?: string;
  
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.confirmDelete(this.selectedComment);
      },
    },
  ];

  public alertPostButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        if (this.postId) {
          this.postService.deletePost(this.postId);
          this.router.navigate(['/'])
        }
      },
    },
  ];

  startEdit(_t167: Comment) {
    throw new Error('Method not implemented.');
  }

  postId?: string;
  post?: Post | null;
  post$?: Observable<Post>;
  comments$?: Observable<Comment[]>;
  comment: Comment = {
    postId: '',
    content: '',
    authorId: this.authService.currentUser?.uid || '',
    authorName: this.authService.currentUser?.displayName || 'anonymous',
    createdAt: new Date(),
  };
  user$?: Observable<User | null>;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.postId = id;
        this.comment.postId = id;
        this.loadPost(); // Optional: if fetching post details from a service
        this.loadComments(id);
      }
    });
    this.user$ = this.authService.user$;
  }

  loadPost() {
    console.log(this.postId);
    if (this.postId) {
      this.post = this.postService.getCurrentPostMatchId(this.postId);
      console.log(this.postId, this.post);
      if (!this.post) {
        this.post$ = this.postService.getPostById(this.postId);
      }
    } else {
      throw 'error getting post id';
    }
  }
  loadComments(id: string | null) {
    if (id) {
      this.comments$ = this.commentService.getCommentsByPostId(id);
    }
  }
  addComment(user: User) {
    this.comment.authorId = user.uid;
    this.comment.authorName = user.displayName || 'anonymous';
    this.commentService.createComment(this.comment);
  }

  selectComment(id: string | undefined) {
    this.selectedComment = id;
  }

  confirmDelete(id: string | undefined) {
    if (id) {
      this.commentService.deleteComment(id);
      
    }
  }

}
