import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavComponent } from './app/nav/side-nav/side-nav.component';
import { NavbarComponent } from './app/nav/navbar/navbar.component';
import { AuthService } from './app/services/auth.service';
import { RightNavComponent } from "./app/nav/right-nav/right-nav.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideNavComponent, NavbarComponent, RightNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'askhisto';
  
 
  constructor() {
   
    
  }
  
}
