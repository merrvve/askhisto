import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Post } from '../../models/Post.interface';
import { RouterLink } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-post-view',
  imports: [CardModule, ButtonModule, RouterLink, CarouselModule, DialogModule ],
  templateUrl: './post-view.component.html',
  styleUrl: './post-view.component.scss'
})
export class PostViewComponent {
  samplePost: Post = {
    id: 'post1',
    userId: '1223',
    userName: 'John Doe',
    userAvatar: 'https://i.pravatar.cc/300',
    title: 'New Post',
    images: ['https://picsum.photos/id/237/200/300','https://picsum.photos/id/1/200/300'],
    text: 'Loren Ipsum dolore',
    labels: [{id:'label1', name:'#cute'}],
    category: {id:'id1', name:'pet'}
  }

  @Input() post : Post = this.samplePost;

  displayModal: boolean = false;
  selectedImage: string | null = null;

  openDialog(image: string) {
    this.selectedImage = image;
    this.displayModal = true;
  }
}
