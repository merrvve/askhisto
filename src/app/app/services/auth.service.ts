import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _user = new BehaviorSubject<User | null>(null);

  // This exposes the current user as an observable
  public user : Observable<User | null> = this._user.asObservable();

  // This checks if the user is logged in
  get isLoggedIn() {
    return this._user.value?.id !== null;
  }

  login(): void {
    // Simulate a fake login with hardcoded user data
    const fakeUser: User = {
      id: '12345',
      displayName: 'John Doe',
      description: 'Just a fake user for demonstration.',
      avatar: 'https://example.com/avatar.jpg',
    };

    this._user.next(fakeUser);
  }

  logout(): void {
    this._user.next(null);
  }

  register(displayName: string, description?: string, avatar?: string): void {
    // Simulate a fake registration process
    const newUser: User = {
      id: Date.now().toString(),
      displayName,
      description,
      avatar,
    };

    this._user.next(newUser);
  }
}
