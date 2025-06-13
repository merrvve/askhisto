import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonApp, IonRouterOutlet, IonTabButton, IonFooter, IonTabBar, IonIcon, IonLabel, IonContent, IonHeader } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonHeader, IonContent, IonLabel, IonIcon, IonTabBar, IonFooter, IonTabButton, IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private router: Router) {}

  navigate(path: string) {
    this.router.navigate(['/' + path]);
  }
}
