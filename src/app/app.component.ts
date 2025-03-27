import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavComponent } from './app/nav/side-nav/side-nav.component';
import { NavbarComponent } from './app/nav/navbar/navbar.component';
import { AuthService } from './app/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideNavComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'askhisto';
  private authService = inject(AuthService);
  user = this.authService.user();

  constructor() {
    // Reactive signal-based subscription
    effect(() => {
      console.log('User changed:', this.authService.user());
    });
  }
  
}
