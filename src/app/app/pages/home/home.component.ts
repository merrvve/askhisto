import { Component } from '@angular/core';
import { PostViewComponent } from "../../posts/post-view/post-view.component";

@Component({
  selector: 'app-home',
  imports: [PostViewComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
