import { Component, inject, Input, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { User } from '../../models/User.interface';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-side-nav',
  imports: [MenuModule, BadgeModule, RippleModule, AvatarModule, RouterModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {

    
    private authService = inject(AuthService);
    

    // Reactive signal to track the current user
    user: User | null = null;

    guestMenuItems: MenuItem[] | undefined;
    userMenuItems: MenuItem[] | undefined;


    
  ngOnInit() {
    this.authService.user.subscribe(
      user=> this.user = user
    )
      this.userMenuItems = [
          {
              separator: true
          },
          {
              label: 'Documents',
              items: [
                  {
                      label: 'New',
                      icon: 'pi pi-plus',
                      shortcut: '⌘+N'
                  },
                  {
                      label: 'Search',
                      icon: 'pi pi-search',
                      shortcut: '⌘+S'
                  }
              ]
          },
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
                      shortcut: '⌘+Q'
                  }
              ]
          },
          {
              separator: true
          }
      ];
      this.guestMenuItems = [
        {
            separator: true
        },
        {
            label: 'Documents',
            items: [
                {
                    label: 'Categories',
                    icon: 'pi pi-server',
                    shortcut: '⌘+N'
                },
                {
                    label: 'Search',
                    icon: 'pi pi-search',
                    shortcut: '⌘+S'
                }
            ]
        },
        {
            label: 'Profile',
            items: [
                
                {
                    label: 'Log In',
                    icon: 'pi pi-sign-in',
                    shortcut: '⌘+Q',
                    routerLink: ['/login'] 
                },
                {
                    label: 'Register',
                    icon: 'pi pi-pen-to-square',
                    shortcut: '⌘+Q'
                },
            ]
        },
        {
            separator: true
        }
    ];
  }
}
