import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, IdTokenResult } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>( null);

  user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private auth: Auth) {
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }

  // Sign up with email & password
  signUp(email: string, password: string): Promise<User> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(result => result.user);
  }

  // Login with email & password
  login(email: string, password: string): Promise<User> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(result => result.user);
  }

  // Logout
  logout(): Promise<void> {
    return signOut(this.auth);
  }

  // Get current user snapshot
  get currentUser(): User | null {
    return this.auth.currentUser;
  }
}
