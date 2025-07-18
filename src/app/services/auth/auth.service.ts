import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, User as FirebaseUser, signInWithCredential } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/User';

import { Capacitor } from '@capacitor/core';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);

  user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private auth: Auth) {
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }

  // Sign up with email & password
  signUp(email: string, password: string): Promise<FirebaseUser> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(result => result.user);
  }

  // Login with email & password
  login(email: string, password: string): Promise<FirebaseUser> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(result => result.user);
  }

  // Login with Google
  async signInWithGoogle(): Promise<FirebaseUser> {
    // const provider = new GoogleAuthProvider();
    // return signInWithPopup(this.auth, provider)
    //   .then(result => result.user);
    if (Capacitor.isNativePlatform()) {
      // ✅ Native Mobile Flow
      const result = await FirebaseAuthentication.signInWithGoogle();

      const idToken = result.credential?.idToken;
      const accessToken = result.credential?.accessToken;

      if (!idToken) {
        throw new Error('Native Google Sign-In failed: No ID token returned.');
      }

      const credential = GoogleAuthProvider.credential(idToken, accessToken);

      // ✅ Sign in to Firebase Web SDK with native credential
      const firebaseUserCredential = await signInWithCredential(this.auth, credential);
      return firebaseUserCredential.user;

    } else {
      // ✅ Web Flow
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      return result.user;
    }
  }

  // Logout
  async logout(): Promise<void> {
    if (Capacitor.isNativePlatform()) {
      await FirebaseAuthentication.signOut(); // Native layer
    }
    await signOut(this.auth); // Firebase JS SDK
  }

  // Get current user snapshot
  get currentUser(): FirebaseUser | null {
    return this.auth.currentUser;
  }
}
