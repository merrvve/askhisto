import { Injectable, signal } from '@angular/core';
import { User } from '../models/User.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _user = signal<User | null>(null);

  get user() {
    return this._user.asReadonly();
  }

  get isLoggedIn() {
    return this._user()?.id !== null;
  }

  login(): void {
    // Simulate a fake login with hardcoded user data
    const fakeUser: User = {
      id: '12345',
      displayName: 'John Doe',
      description: 'Just a fake user for demonstration.',
      avatar: 'https://example.com/avatar.jpg',
    };

    this._user.set(fakeUser);
  }

  logout(): void {
    this._user.set(null);
  }

  register(displayName: string, description?: string, avatar?: string): void {
    // Simulate a fake registration process
    const newUser: User = {
      id: Date.now().toString(),
      displayName,
      description,
      avatar,
    };

    this._user.set(newUser);
  }
}
