import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonApp, IonRouterOutlet, IonTabButton, IonFooter, IonTabBar, IonIcon, IonLabel, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons } from '@ionic/angular/standalone';
import { ToolbarComponent } from "./ui/toolbar/toolbar.component";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [ IonContent, IonLabel, IonIcon, IonTabBar, IonFooter, IonTabButton, IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private router: Router) {}

  navigate(path: string) {
    this.router.navigate(['/' + path]);
  }
}
