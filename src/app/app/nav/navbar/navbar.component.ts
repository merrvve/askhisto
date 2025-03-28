import { Component, inject, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { User } from '../../models/User.interface';
import { Menu} from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-navbar',
  imports: [ Menu,ButtonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  items: MenuItem[] | undefined;
  

  private authService = inject(AuthService);
  private router = inject(Router);
  

    // Reactive signal to track the current user
    user: User | null = null;

   
    
  
    
  ngOnInit() {
    this.authService.user.subscribe(
        user=> this.user = user
      )
      
      this.items = [
        {
            label: 'Profile',
            items: [
                {
                    label: 'Settings',
                    icon: 'pi pi-cog',
                    shortcut: '⌘+O'
                },
                {
                    label: 'Messages',
                    icon: 'pi pi-inbox',
                    badge: '2'
                },
                {
                    label: 'Logout',
                    icon: 'pi pi-sign-out',
                    shortcut: '⌘+Q',
                    command: ()=> {
                      this.authService.logout();
                      this.router.navigate(['']);
                    }
                }
            ]
        }
      ]
  }
}
