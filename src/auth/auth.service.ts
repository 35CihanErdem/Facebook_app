import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersKey = 'users';
  private users: { username: string; password: string }[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router 
  ) {
    this.loadUsers();
  }

  private getStorage(): Storage | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage;
    }
    return null;
  }

  private loadUsers(): void {
    const storage = this.getStorage();
    if (storage) {
      const usersJson = storage.getItem(this.usersKey);
      if (usersJson) {
        this.users = JSON.parse(usersJson);
      }
    }
  }

  private saveUsers(): void {
    const storage = this.getStorage();
    if (storage) {
      storage.setItem(this.usersKey, JSON.stringify(this.users));
    }
  }

  login(username: string, password: string): boolean {
    const user = this.users.find(user => user.username === username && user.password === password);
    if (user) {
      const storage = this.getStorage();
      if (storage) {
        storage.setItem('isLoggedIn', 'true');
      }
      return true;
    }
    return false;
  }

  register(username: string, password: string): boolean {
    const userExists = this.users.some(user => user.username === username);
    if (userExists) {
      return false; 
    }
    this.users.push({ username, password });
    this.saveUsers(); 
    return true; 
  }

  isLoggedIn(): boolean {
    const storage = this.getStorage();
    if (storage) {
      return storage.getItem('isLoggedIn') === 'true';
    }
    return false;
  }

  logout(): void {
    const storage = this.getStorage();
    if (storage) {
      storage.removeItem('isLoggedIn');
      this.router.navigate(['/login']);  // Çıkış yaptıktan sonra login sayfasına yönlendir
    }
  }

  resetPassword(username: string, newPassword: string): boolean {
    const user = this.users.find(user => user.username === username);
    if (user) {
      user.password = newPassword;
      this.saveUsers();
      return true;
    }
    return false;
  }
  
}
