import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonApp, IonRouterOutlet, IonTabButton, IonFooter, IonTabBar, IonIcon, IonLabel, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons } from '@ionic/angular/standalone';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [ IonContent, IonLabel, IonIcon, IonTabBar, IonFooter, IonTabButton, IonApp, IonRouterOutlet],
})
export class AppComponent {

  safeTopPadding = 'env(safe-area-inset-top)';
  safeBottomPadding = 'env(safe-area-inset-bottom)';

  constructor(private router: Router,
    private platform: Platform
  ) {
     this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      if (Capacitor.isNativePlatform()) {
        try {
          await StatusBar.setOverlaysWebView({ overlay: false });
        } catch (err) {
          console.warn('StatusBar error:', err);
        }
      }
    });
  }
  navigate(path: string) {
    this.router.navigate(['/' + path]);
  }
}
