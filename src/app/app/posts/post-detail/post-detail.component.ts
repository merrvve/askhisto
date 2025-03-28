import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../models/Post.interface';

@Component({
  selector: 'app-post-detail',
  imports: [],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent {
  postId!: string;
  @Input() post : Post | undefined;

  
  private route = inject(ActivatedRoute)

  ngOnInit(): void {
    if(!this.post) {
      this.postId = this.route.snapshot.paramMap.get('id') || '';
      this.post = {
        id: this.postId,
        userId: '',
        userName: '',
        userAvatar: '',
        title: '',
        images: [],
        text: '',
        labels: []
      }
    } 
  
  }
}
