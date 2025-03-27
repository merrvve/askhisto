import { Component } from '@angular/core';
import { PostViewComponent } from "../../posts/post-view/post-view.component";
import { RightNavComponent } from "../../nav/right-nav/right-nav.component";

@Component({
  selector: 'app-home',
  imports: [PostViewComponent, RightNavComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
