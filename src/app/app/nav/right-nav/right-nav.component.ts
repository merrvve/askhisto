import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
@Component({
  selector: 'app-right-nav',
  imports: [CardModule, ButtonModule, ChipModule],
  templateUrl: './right-nav.component.html',
  styleUrl: './right-nav.component.scss'
})
export class RightNavComponent {

}
