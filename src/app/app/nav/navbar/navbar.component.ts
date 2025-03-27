import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { User } from '../../models/User.interface';
import { Menu} from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-navbar',
  imports: [ Menu,ButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  items: MenuItem[] | undefined;
  @Input() user: User | null = null;

  ngOnInit() {
      this.items = [
          {
              label: 'Home',
              icon: 'pi pi-home'
          },
          {
              label: 'Features',
              icon: 'pi pi-star'
          },
          {
              label: 'Projects',
              icon: 'pi pi-search',
              items: [
                  {
                      label: 'Components',
                      icon: 'pi pi-bolt'
                  },
                  {
                      label: 'Blocks',
                      icon: 'pi pi-server'
                  },
                  {
                      label: 'UI Kit',
                      icon: 'pi pi-pencil'
                  },
                  {
                      label: 'Templates',
                      icon: 'pi pi-palette',
                      items: [
                          {
                              label: 'Apollo',
                              icon: 'pi pi-palette'
                          },
                          {
                              label: 'Ultima',
                              icon: 'pi pi-palette'
                          }
                      ]
                  }
              ]
          },
          {
              label: 'Contact',
              icon: 'pi pi-envelope'
          }
      ]
  }
}
